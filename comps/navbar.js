import Link from "next/link";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Image from "next/image";
import topevent from "../topevent.png";

const NavbarNavigation = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <Image src={topevent} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarNavigation;
