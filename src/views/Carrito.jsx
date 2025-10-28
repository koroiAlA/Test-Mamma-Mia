import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { myContext } from "../myContextPizza";
import "../App.css"; 

const Carrito = () => {
  const { cart, setCart } = useContext(myContext);

  const changeAmount = (action, id, amount) => {
    setCart((items) =>
      items.map((obj) => {
        if (obj.idProduct === id) {
          if (action === "increase") {
            return { ...obj, amount: amount + 1 };
          } else if (action === "diminish" && amount > 1) {
            return { ...obj, amount: amount - 1 };
          }
        }
        return obj;
      })
    );
  };

  const total = cart
    .map((item) => item.price * item.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="cart-container">
      <h2 className="text-center mb-4 text-light">🛒 Detalles del pedido</h2>

      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={item.idProduct || index} className="cart-card">
            <img src={item.img} alt={item.name} />
            <h5>{item.name.replace(/^./, item.name[0].toUpperCase())}</h5>
            <p>Precio: ${item.price}</p>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-2">
              <Button
                variant="danger"
                onClick={() =>
                  changeAmount("diminish", item.idProduct, item.amount)
                }
              >
                -
              </Button>
              <strong>{item.amount}</strong>
              <Button
                variant="primary"
                onClick={() =>
                  changeAmount("increase", item.idProduct, item.amount)
                }
              >
                +
              </Button>
            </div>
            <h6 className="mt-3">Subtotal: ${item.price * item.amount}</h6>
          </div>
        ))}
      </div>

      <hr className="text-light" />
      <h2 className="text-center text-light mt-3">Total: ${total}</h2>
      <div className="text-center mt-3">
        <Button variant="success" size="lg">
          Ir a pagar 💳
        </Button>
      </div>
    </div>
  );
};

export default Carrito;
