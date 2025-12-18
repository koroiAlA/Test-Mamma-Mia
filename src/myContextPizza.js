import React, { createContext, useEffect, useState } from "react";

export const myContext = createContext();

const PizzaProvider = ({ children }) => {
  const [pizza, setPizza] = useState([]);
  const [cart, setCart] = useState([]);

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

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
      return existing
        ? prevCart.map((p) =>
            p.idProduct === product.id ? { ...p, amount: p.amount + 1 } : p
          )
        : [
            ...prevCart,
            {
              idProduct: product.id,
              name: product.name,
              price: product.price,
              img: product.img,
              amount: 1,
            },
          ];
    });
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.amount, 0);
  const increaseAmount = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.idProduct === id ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const decreaseAmount = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.idProduct === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      )
    );
  };

  return (
    <myContext.Provider
      value={{
        pizza,
        cart,
        addToCart,
        totalPrice,
        totalItems,
        theme,
        toggleTheme,
        increaseAmount,
        decreaseAmount,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default PizzaProvider;
