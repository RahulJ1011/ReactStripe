import { createContext, useEffect, useState } from "react";
import db from '../data/db.json'

export const cartContext = createContext({
  items: [],
  totalPrice: () => {},
  removeCart: () => {},
  quantity: () => {},
  addToCart: () => {}
});

const Context = ({ children }) => {
  const [Carts, setCart] = useState(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    return cartData || []; 
  });

  const quantity = (id) => {
    const prod = db.find((product) => product.id === id);
    return prod ? prod.quantity : 0;
  };

  const addToCart = (id) => {
    const prod = db.find((item) => item.id === id);
    if (prod) {
      setCart((prevCarts) => {
        const updatedCarts = [...prevCarts, prod];
        localStorage.setItem("cart", JSON.stringify(updatedCarts));
        return updatedCarts;
      });
    }
  };

  const removeCart = (id) => {
    setCart((prevCarts) => {
      const updatedCarts = prevCarts.filter((prev) => prev.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCarts));
      return updatedCarts;
    });
  };

  const totalPrice = () => {
    let price = 0;
    Carts.forEach((prod) => {
      price += prod.price * prod.quantity;
    });
    return price;
  };

  return (
    <cartContext.Provider
      value={{
        Carts,
        setCart,
        totalPrice,
        removeCart,
        quantity,
        addToCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default Context;
