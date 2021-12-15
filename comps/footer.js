import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const { pathname } = useRouter();
  return (
    <footer className="">
      <Container fluid>
        <Row className="text-center">
          <Col md="4">
            <ul
              style={{
                display: "block",
                margin: "0",
                padding: "0",
                listStyle: "none",
              }}
            >
              <li className="list-unstyled fw-bold">COMPANY</li>
              <li className="list-unstyled">
                <Link href="/leadership" passHref>
                  Leadership
                </Link>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  History
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  Careers
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  Partner with us
                </a>
              </li>
            </ul>
          </Col>
          <Col md="4">
            <ul
              style={{
                display: "block",
                margin: "0",
                padding: "0",
                listStyle: "none",
              }}
            >
              <li className="list-unstyled fw-bold">RESSOURCES</li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  FAQs
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  Solutions
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  Press Room
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  Videos
                </a>
              </li>
            </ul>
          </Col>
          <Col md="4">
            <ul
              style={{
                display: "block",
                margin: "0",
                padding: "0",
                listStyle: "none",
              }}
            >
              <li className="list-unstyled fw-bold">SUPPORT</li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  Product Login
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!" className="text-decoration-none text-muted">
                  Support Request
                </a>
              </li>
              <li className="list-unstyled">
                <a
                  href="#!"
                  className="text-decoration-none text-muted disabled"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Container fluid className="text-center py-3">
        &copy; {new Date().getFullYear()} Copyright: ABC, LLC. All rights
        reserved. All trademarks are the property of their respective owners.
      </Container>
    </footer>
  );
}

//   return (
//     <div className="position-absolute bottom-0 start-0 ">
//       RODOLPHO RICHARD NAPOLEON
//     </div>
//   );
// };

// export default Footer;
