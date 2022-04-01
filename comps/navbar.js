import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";
import Image from "next/image";
import topevent from "../topevent.png";

const NavbarNavigation = () => {
  return (
    <>
      <Navbar bg="light" expand="md" variant="light" className="ms-auto fs-5">
        <Container>
          <Link href="/" passHref className="nav-item">
            <a>
              <Image src={topevent} alt="" />
            </a>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="me-5">
              <Link href="/" passHref className="nav-item border text-danger">
                <a className="nav-link">Home</a>
              </Link>
              <Link href="/about" passHref className="nav-item border">
                <a className="nav-link">About</a>
              </Link>
              <Link href="/contact" passHref className="nav-item border">
                <a className="nav-link">Contact</a>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarNavigation;
