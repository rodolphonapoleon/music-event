import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import logo from "../bannerhome.png";
import { Button, Card, Row, Col, Form, Container } from "react-bootstrap";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import SelectUSState from "react-select-us-states";

const PaginationItem = ({
  items,
  pageSize,
  onPageChange,
  nextApiPage,
  previousApiPage,
}) => {
  if (items.length <= 1) return null;

  let num = Math.ceil(items.length / pageSize);
  let pages = range(1, num);
  const list = pages.map((page) => {
    return (
      <Pagination.Item key={page} onClick={onPageChange}>
        {page}
      </Pagination.Item>
    );
  });
  return (
    <div>
      <Pagination
        style={{
          maxWidth: "30rem",
          margin: "auto",
          justifyContent: "center",
          marginBottom: "5rem",
        }}
      >
        <Pagination.Prev onClick={previousApiPage} />
        <ul className="pagination">{list}</ul>
        <Pagination.Next onClick={nextApiPage} />
      </Pagination>
    </div>
  );
};
const range = (start, end) => {
  return Array(end - start + 1)
    .fill(0)
    .map((item, i) => start + i);
};
function paginate(items, pageNumber, pageSize) {
  const start = (pageNumber - 1) * pageSize;
  let page = items.slice(start, start + pageSize);
  return page;
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isloading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isloading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isloading: false, isError: true };
    default:
      throw new Error();
  }
};

const useDataApi = (initialData, initialUrl) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isloading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel)
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        if (!didCancel) dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

function App() {
  const [query, setQuery] = useState("AL");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPagesize] = useState(10);
  const [apiPageNumber, setApiPageNumber] = useState(0);
  const [{ data, isloading, isError }, doFetch] = useDataApi(
    { _embedded: { events: [] }, page: { totalPages: 0, number: 0 } },
    `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=0&countryCode=US&stateCode=LA&classificationName=music`
  );
  const handleApiPageNext = (e) => {
    if (apiPageNumber <= data.page.totalPages - 1) {
      setApiPageNumber(apiPageNumber + 1);
      doFetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=${apiPageNumber}&countryCode=US&stateCode=${query}&classificationName=music`
      );
    } else return;
  };
  const handleApiPagePrevious = (e) => {
    if (apiPageNumber >= 1) {
      setApiPageNumber(apiPageNumber - 1);
      doFetch(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=${apiPageNumber}&countryCode=US&stateCode=${query}&classificationName=music`
      );
    } else return;
  };
  // console.log(` Api Page number: ${data.page.number}`);
  // console.log(`Total Page: ${data.page.totalPages}`);

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data._embedded.events;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    // console.log(`currentPage: ${currentPage}`);
  }

  useEffect(() => {
    doFetch(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=${apiPageNumber}&countryCode=US&stateCode=${query}&classificationName=music`
    );
  }, [apiPageNumber]);

  return (
    <>
      <Container className="fluid">
        <div style={{ position: "relative" }}>
          <Image src={logo} />

          <div
            style={{
              width: "20rem",
              margin: "auto",
            }}
            className="position-absolute top-75
           start-50 translate-middle-x"
          >
            <Form
              onSubmit={(event) => {
                doFetch(
                  `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=${apiPageNumber}&countryCode=US&stateCode=${query}&classificationName=music`
                );

                event.preventDefault();
              }}
            >
              <Row className="gx-0 shadow">
                <Col xs={9}>
                  <SelectUSState
                    className="form-select"
                    onChange={(value) => {
                      setQuery(value);
                      setApiPageNumber(0);
                    }}
                  />
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    type="submit"
                    className="searchbutton"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        {isError && <div>Something wrong happen...</div>}
        {isloading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {page.map((item) => (
              <Card
                className="my-5 mx-auto border-white shadow rounded"
                style={{
                  maxWidth: "60rem",
                }}
                key={item.id}
              >
                <Row>
                  <Col xs={12} md={6}>
                    <Card.Img variant="top" src={item.images[0].url} />
                  </Col>
                  <Col xs={12} md={6}>
                    <Card.Body className="text-center">
                      <Card.Title className="fs-3">{item.name}</Card.Title>
                      <Card.Text className=" mt-0">
                        <span className="text-danger fs-5">
                          {item._embedded.venues[0].name}
                        </span>{" "}
                        <br /> {item._embedded.venues[0].address.line1},{" "}
                        {item._embedded.venues[0].city.name},{" "}
                        {item._embedded.venues[0].state.stateCode}{" "}
                        {item._embedded.venues[0].postalCode} <br />{" "}
                        {item.dates.start.localDate} /{" "}
                        {item.dates.start.localTime}
                      </Card.Text>
                      <Button variant="primary" size="sm" className="">
                        <a
                          className={styles.linkticket}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          BUY TICKET
                        </a>
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}

        <PaginationItem
          items={data._embedded.events}
          pageSize={pageSize}
          nextApiPage={handleApiPageNext}
          previousApiPage={handleApiPagePrevious}
          onPageChange={handlePageChange}
        ></PaginationItem>
      </Container>
    </>
  );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Music Event</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <App />
      </main>
    </div>
  );
}
