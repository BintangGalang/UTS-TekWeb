import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { BillingProvider } from "./utils/BillingContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole)
    return <Navigate to="/login" replace />;

  return children;
};

export default function App() {
  return (
    <BillingProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/adminpage"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BillingProvider>
  );
}
