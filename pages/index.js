import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import logo from "../homebanner.png";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const PaginationItem = ({ items, pageSize, onPageChange, nextPage }) => {
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
          width: "30rem",
          margin: "auto",
          justifyContent: "center",
          marginBottom: "5rem",
        }}
      >
        <Pagination.Prev
          onClick={(event) => {
            console.log("maman");
          }}
        />
        <ul className="pagination">{list}</ul>
        <Pagination.Next onClick={nextPage} />
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
  const [pageSize, setPagesize] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [{ data, isloading, isError }, doFetch] = useDataApi(
    { _embedded: { events: [] }, page: { totalPages: 0, number: 0 } },
    `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=0&countryCode=US&stateCode=AL&classificationName=music`
  );
  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data._embedded.events;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }
  const handlePageNext = (e) => {
    console.log("hello");
    // if (pageNumber < data.page.totalPages - 1) {
    //   setPageNumber(pageNumber + 1);
    // } else return;
  };
  console.log(data.page.number);
  console.log(data.page.totalPages);
  return (
    <>
      <div style={{ position: "relative" }}>
        <Image src={logo} />

        <div
          style={{ width: "30rem", margin: "auto" }}
          className="position-absolute top-75
           start-50 translate-middle-x"
        >
          <Form
            onSubmit={(event) => {
              doFetch(
                `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=${pageNumber}&countryCode=US&stateCode=${query}&classificationName=music`
              );

              event.preventDefault();
            }}
          >
            <Row className="gx-0 shadow">
              <Col md={10}>
                <Form.Select
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPageNumber(0);
                  }}
                >
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IO">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Col>
              <Col>
                {/* <button onClick={() => handlePageNext()}>next</button> */}
                <Button variant="danger" type="submit" className="searchbutton">
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
        <ul>
          {page.map((item) => (
            <Card
              className="my-5 mx-auto border-white shadow rounded"
              key={item.id}
              style={{ width: "60rem" }}
            >
              <Row>
                <Col>
                  <Card.Img variant="top" src={item.images[0].url} />
                </Col>
                <Col>
                  <Card.Body>
                    <Card.Title className="fs-3">{item.name}</Card.Title>
                    <Card.Text className="text-danger fs-5">
                      {item._embedded.venues[0].name}
                    </Card.Text>
                    <Card.Text>
                      {item._embedded.venues[0].address.line1},{" "}
                      {item._embedded.venues[0].city.name},{" "}
                      {item._embedded.venues[0].state.stateCode}{" "}
                      {item._embedded.venues[0].postalCode}
                    </Card.Text>
                    <Card.Text>
                      {item.dates.start.localDate} /{" "}
                      {item.dates.start.localTime}
                    </Card.Text>
                    <Button variant="primary" size="sm" className="">
                      <a className={styles.linkticket} href={item.url}>
                        BUY TICKET
                      </a>
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </ul>
      )}
      <PaginationItem
        items={data._embedded.events}
        pageSize={pageSize}
        nextPage={handlePageNext}
        onPageChange={handlePageChange}
      ></PaginationItem>
    </>
  );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Music Event</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <App />
      </main>
    </div>
  );
}
