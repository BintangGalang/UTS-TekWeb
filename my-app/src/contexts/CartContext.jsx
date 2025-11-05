import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const LS_KEY = "billing_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product, qty = 1) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === product.id);
      if (idx === -1) return [...prev, { ...product, qty }];
      const copy = [...prev];
      copy[idx].qty += qty;
      return copy;
    });
  }

  function updateQty(id, qty) {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)));
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((s, it) => s + it.amount * it.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
