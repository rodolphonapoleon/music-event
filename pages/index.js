import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import logo from "../homebanner.png";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const Pagination = ({ items, pageSize, onPageChange }) => {
  if (items.length <= 1) return null;

  let num = Math.ceil(items.length / pageSize);
  let pages = range(1, num + 1);
  const list = pages.map((page) => {
    return (
      <Button key={page} onClick={onPageChange} className="page-item">
        {page}
      </Button>
    );
  });
  return (
    <nav>
      <ul className="pagination">{list}</ul>
    </nav>
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
  const [query, setQuery] = useState("jacksonville");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPagesize] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [{ data, isloading, isError }, doFetch] = useDataApi(
    { _embedded: { events: [] }, page: { totalPages: 0, number: 0 } },
    `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=0&city=jacksonville&countryCode=US&stateCode=FL&classificationName=music`
  );
  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };
  let page = data._embedded.events;
  if (page.length >= 1) {
    page = paginate(page, currentPage, pageSize);
    console.log(`currentPage: ${currentPage}`);
  }
  const handlePageNumber = () => {
    if (pageNumber < data.page.totalPages - 1) {
      setPageNumber(pageNumber + 1);
    } else return;
  };
  console.log(data.page.number);
  console.log(data.page.totalPages);
  return (
    <Container className="">
      <div className="">
        <form
          onSubmit={(event) => {
            doFetch(
              `https://app.ticketmaster.com/discovery/v2/events?apikey=zhgYGyl2ENoFnuVxA9JARhuGcHep9N79&locale=*&page=${pageNumber}&city=${query}&countryCode=US&stateCode=FL&classificationName=music`
            );

            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPageNumber(0);
            }}
          />
          <button onClick={() => handlePageNumber()}>next</button>
          <button type="submit">Search</button>
        </form>
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
                    <Button variant="primary" size="sm" className="end">
                      <a className={styles.linkticket} href={item.url}>
                        BUY TICKET
                      </a>
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
              {/* <h1>{item.name}</h1>
              <a href={item.url}>BUY TICKET</a>
              <h4>{item.dates.start.localDate}</h4>
              <h4>{item.dates.start.localTime}</h4>
              <h4>{item.dates.timezone}</h4>
              <h4>{item._embedded.venues[0].name}</h4>
              <h4>{item._embedded.venues[0].address.line1}</h4>
              <h4>{item._embedded.venues[0].city.name}</h4>
              <h4>{item._embedded.venues[0].postalCode}</h4>
              <h4>{item._embedded.venues[0].state.stateCode}</h4>
              <div>
                <img src={item.images[0].url}></img>
              </div> */}
            </Card>
          ))}
        </ul>
      )}
      <Pagination
        items={data._embedded.events}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      ></Pagination>
    </Container>
  );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Image src={logo} />
        <App />
      </main>
    </div>
  );
}
