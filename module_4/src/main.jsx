import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from './App.jsx'
import Products from "./pages/products.jsx";
import CartPage from './pages/cart.jsx';
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ItemCart from "./pages/ItemCart.jsx";
import Payment from "./pages/Payment.jsx";
import ProductsDetail from "./pages/ProductsDetail.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryManagement from "./pages/CategoryManagement.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import ProductManagement from "./pages/ProductManagement.jsx";
import OrderManagement from "./pages/OrderManagement.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/itemcart" element={<ItemCart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/detail" element={<ProductsDetail />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
