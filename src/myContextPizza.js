import React, { createContext, useEffect, useState } from "react";

export const myContext = createContext();

const PizzaProvider = ({ children }) => {
  const [pizza, setPizza] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const dataPizza = async () => {
      const response = await fetch("/pizzas.json");
      const data = await response.json();
      setPizza(data);
    };
    dataPizza();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.idProduct === product.id);
      if (existing) {
        return prevCart.map((p) =>
          p.idProduct === product.id ? { ...p, amount: p.amount + 1 } : p
        );
      } else {
        return [
          ...prevCart,
          {
            idProduct: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            amount: 1,
          },
        ];
      }
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);

  return (
    <myContext.Provider
      value={{
        pizza,
        setPizza,
        cart,
        setCart,
        addToCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default PizzaProvider;
