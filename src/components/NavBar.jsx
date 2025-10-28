import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import NavbarHeader from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { myContext } from "../myContextPizza";

const Navbar = () => {
  const { totalPrice, totalItems } = useContext(myContext);

  return (
    <NavbarHeader expand="lg" bg="info" variant="dark" sticky="top">
      <Container>
        <NavbarHeader.Toggle aria-controls="navbarScroll" />
        <NavbarHeader.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
              })}
              className="text-decoration-none"
              to="/"
            >
              <NavbarHeader.Brand>
                🍕 Pizzería Mamma Mia!
              </NavbarHeader.Brand>
            </NavLink>
          </Nav>

          <Nav>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
              })}
              className="text-decoration-none"
              to="/carrito"
            >
              <NavbarHeader.Brand>
                🛒 {totalItems} | 💵 ${totalPrice}
              </NavbarHeader.Brand>
            </NavLink>
          </Nav>
        </NavbarHeader.Collapse>
      </Container>
    </NavbarHeader>
  );
};

export default Navbar;
