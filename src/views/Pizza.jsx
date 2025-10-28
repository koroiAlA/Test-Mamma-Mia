import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { myContext } from "../myContextPizza";

const Pizza = () => {
  const { pizza, addToCart } = useContext(myContext);
  const { id } = useParams();

  const item = pizza.find((element) => element.id === id);

  if (!item) return <p className="text-center mt-5">Cargando...</p>;

  const cardStyle = {
    background: "rgba(0, 50, 70, 0.45)",
    backdropFilter: "blur(15px)",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
    color: "#E0F7FA",
    padding: "2rem",
  };

  const titleStyle = {
    color: "#A7FFEB",
    fontWeight: "bold",
    textShadow: "0 0 8px rgba(0,255,255,0.6)",
  };

  const priceStyle = {
    color: "#00E5FF",
    fontWeight: "bold",
    textShadow: "0 0 10px rgba(0,200,255,0.7)",
  };

  const ingredientStyle = {
    color: "#C8E6C9",
    fontSize: "1rem",
  };

  return (
    <div className="container w-75 mt-5">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 ps-0">
          <img
            width="100%"
            height="100%"
            src={item.img}
            alt="Pizza"
            style={{ borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
          />
        </div>

        <div className="col-lg-6 col-md-12 mt-4 mt-lg-0">
          <div style={cardStyle}>
            <h2 style={titleStyle}>
              {item.name.replace(/^./, item.name[0].toUpperCase())}
            </h2>
            <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />
            <p style={{ color: "#E0F2F1", lineHeight: "1.6" }}>{item.desc}</p>

            <h4 style={{ color: "#80DEEA" }}>Ingredientes:</h4>
            <div className="container text-left w-75">
              {item.ingredients.map((ing, i) => (
                <p key={i} style={ingredientStyle}>
                  🍕 {ing}
                </p>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <h3 style={priceStyle}>Precio: ${item.price}</h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
