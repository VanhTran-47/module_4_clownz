import React from "react";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import "../pages/cart.css"; 

const CartPage = () => {
  return (
    <>
      <Header />
      <Navigation />

      <div className="cart-container">
        <div className="cart-empty">
          <img
            src="/images/delete.png"
            alt="Giỏ hàng trống"
            className="cart-empty-image"
          />
          <h2 className="cart-empty-title">Giỏ hàng của bạn đang trống</h2>
          <a href="/products" className="cart-empty-button">
            Tiếp tục mua sắm
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
