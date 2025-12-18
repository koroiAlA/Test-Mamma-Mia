import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import NavbarHeader from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { myContext } from "../myContextPizza";

const Navbar = () => {
  const { totalPrice, totalItems, theme, toggleTheme } = useContext(myContext);

  return (
    <NavbarHeader
      expand="lg"
      sticky="top"
      className={`navbar-${theme}`}
      variant={theme}
    >
      <Container>
        <NavbarHeader.Toggle />
        <NavbarHeader.Collapse>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none">
              <NavbarHeader.Brand>
                🍕 Pizzería Mamma Mia!
              </NavbarHeader.Brand>
            </NavLink>
          </Nav>

          <Nav className="align-items-center gap-3">
            <NavLink to="/carrito" className="text-decoration-none">
              <NavbarHeader.Brand>
                🛒 {totalItems} | 💵 ${totalPrice}
              </NavbarHeader.Brand>
            </NavLink>

            <Button
              variant="outline-light"
              onClick={toggleTheme}
              style={{ borderRadius: "50px" }}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </Button>
          </Nav>
        </NavbarHeader.Collapse>
      </Container>
    </NavbarHeader>
  );
};

export default Navbar;
