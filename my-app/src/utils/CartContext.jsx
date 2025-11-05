import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🔹 Tambahkan item ke cart (hindari duplikasi)
  const addToCart = (item) => {
    const exists = cartItems.find((i) => i.id === item.id);
    if (exists) {
      return; // hindari item ganda
    }
    setCartItems([...cartItems, { ...item, qty: 1 }]);
  };

  // 🔹 Hapus item dari cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((i) => i.id !== id));
  };

  // 🔹 Kosongkan cart
  const clearCart = () => setCartItems([]);

  // 🔹 Hitung total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.amount * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
