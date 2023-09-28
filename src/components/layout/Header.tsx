import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" className="text-white">
          Carbon Certificate
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Certificates
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites">
            Favorites
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
