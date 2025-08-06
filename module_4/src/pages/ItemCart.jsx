import React from "react";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../pages/ItemCart.css";

const ItemCart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
    totalPrice,
  } = useCart();

  return (
    <>
      <Header />
      <Navigation />

      <div className="item-cart-page">
        <div className="item-cart-container">
          <h2 className="cart-title">
            GIỎ HÀNG <span>({totalQuantity} sản phẩm)</span>
          </h2>

          <div className="cart-content">
            <div className="cart-left">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-pay">
                  <img src={item.image} alt={item.name} className="cart-image" />
                  <div className="cart-item-info">
                    <p className="name">{item.name}</p>
                    <Link to="/products" className="remove-button">
                      <p className="remove">Xóa</p>
                    </Link>
                  </div>
                  <div className="cart-item-price">
                    <p>{(item.price || 0).toLocaleString("vi-VN")}₫</p>
                    <div className="quantity-box">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-right">
              <div className="summary">
                <p>Tạm tính:</p>
                <strong>{(totalPrice || 0).toLocaleString("vi-VN")}₫</strong>
              </div>
              <div className="summary">
                <p>Thành tiền:</p>
                <strong className="total">{(totalPrice || 0).toLocaleString("vi-VN")}₫</strong>
              </div>
              <Link to="/payment" className="order-button"> THANH TOÁN NGAY </Link>
              <Link to="/products" className="continue-button">
                TIẾP TỤC MUA HÀNG
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ItemCart;
