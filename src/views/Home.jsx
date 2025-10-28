import React, { useContext } from "react";
import { myContext } from "../myContextPizza";
import ImgenHeader from "../assets/img/header.jfif";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "../App.css";

const header = {
  backgroundImage: `url(${ImgenHeader})`,
  width: "100%",
  height: "300px",
  backgroundSize: "cover",
  overflow: "hidden",
  color: "white",
};

const Home = () => {
  const { pizza, addToCart } = useContext(myContext);
  const navigate = useNavigate();

  const glassCard = {
    background: "rgba(0, 50, 70, 0.45)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
    color: "#E0F7FA",
    border: "1px solid rgba(255,255,255,0.15)",
  };

  const titleStyle = {
    color: "#A7FFEB",
    fontWeight: "bold",
    textAlign: "center",
    textShadow: "0 0 6px rgba(0,255,255,0.5)",
  };

  const ingredientTitle = {
    color: "#80DEEA",
    fontWeight: "bold",
  };

  const ingredientStyle = {
    color: "#C8E6C9",
    fontSize: "0.95rem",
  };

  const priceStyle = {
    color: "#00E5FF",
    fontWeight: "bold",
    textShadow: "0 0 10px rgba(0,200,255,0.7)",
  };

  return (
    <div>
      <div style={header}>
        <div className="container text-center w-50 mt-5">
          <h1>Pizzería Mamma Mia!</h1>
          <h5>Tenemos las mejores pizzas que podrás encontrar</h5>
          <hr />
        </div>
      </div>

      <Container className="mt-5">
        <Row xs={1} md={4} className="g-4">
          {pizza.map((item) => (
            <Col key={item.id}>
              <Card style={glassCard}>
                <Card.Img
                  variant="top"
                  src={item.img}
                  style={{
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    height: "180px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Title style={titleStyle}>
                    {item.name.replace(/^./, item.name[0].toUpperCase())}
                  </Card.Title>
                </Card.Body>

                <ListGroup
                  className="list-group-flush"
                  style={{ background: "transparent" }}
                >
                  <ListGroup.Item
                    style={{
                      background: "transparent",
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    <span style={ingredientTitle}>Ingredientes:</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <div className="container text-left w-75">
                      {item.ingredients.map((ing, i) => (
                        <p
                          key={i}
                          className="py-0 my-0"
                          style={ingredientStyle}
                        >
                          🍕 {ing}
                        </p>
                      ))}
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      background: "transparent",
                      border: "none",
                      textAlign: "center",
                    }}
                  >
                    <h3 style={priceStyle}>$ {item.price}</h3>
                  </ListGroup.Item>
                </ListGroup>

                <Card.Body className="text-center">
                  <Button
                    variant="info"
                    className="me-2"
                    onClick={() => navigate(`/pizza/${item.id}`)}
                    style={{
                      backgroundColor: "#00BCD4",
                      border: "none",
                      fontWeight: "bold",
                      boxShadow: "0 4px 10px rgba(0, 200, 255, 0.5)",
                    }}
                  >
                    Ver más 👀
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => addToCart(item)}
                    style={{
                      backgroundColor: "#FF4081",
                      border: "none",
                      fontWeight: "bold",
                      boxShadow: "0 4px 10px rgba(255, 64, 129, 0.5)",
                    }}
                  >
                    Añadir 🛒
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
