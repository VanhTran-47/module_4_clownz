import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import "../pages/Payment.css";

export default function Payment() {
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    totalQuantity,
    totalPrice,
    clearCart,
  } = useCart();

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/01?depth=3") 
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts);
        setSelectedDistrict(data.districts[0]?.code || "");
        setWards(data.districts[0]?.wards || []);
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(
        (d) => d.code === Number(selectedDistrict)
      );
      if (district) setWards(district.wards);
    }
  }, [selectedDistrict]);

  return (
    <>
      <Header />
      <Navigation />

      <div className="payment-page">
        <form>
          <h3>Thông tin nhận hàng</h3>
          <input placeholder="Email" />
          <input placeholder="Họ và tên" />
          <input placeholder="Số điện thoại" />
          <input placeholder="Địa chỉ" />
          <select defaultValue="01">
            <option value="01">Thành phố Hà Nội</option>
          </select>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            {districts.map((d) => (
              <option value={d.code} key={d.code}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
          >
            {wards.map((w) => (
              <option value={w.code} key={w.code}>
                {w.name}
              </option>
            ))}
          </select>
          <textarea placeholder="Ghi chú (tuỳ chọn)" />
        </form>

        <div className="order-summary">
          <h3>Đơn hàng ({totalQuantity} sản phẩm)</h3>

          <div className="cart-item-list">
            {cartItems.map((item) => (
              <div className="summary-item" key={item.id}>
                <div className="summary-left">
                  <img src="/images/product-01.png" alt="T-shirt" className="cart-image" />
                  <div>
                    <p className="name">{item.name}</p>
                    <p className="quantity">Số lượng: {item.quantity}</p>
                  </div>
                </div>
                <div className="summary-price">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </div>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <span>Tạm tính:</span>
            <span>{(totalPrice || 0).toLocaleString("vi-VN")}₫</span>
          </div>

          <div className="summary-total final">
            <span>Tổng cộng:</span>
            <span className="total-price">
              {totalPrice.toLocaleString("vi-VN")}₫
            </span>
          </div>

          <button
            type="button"
            className="checkout-button"
            onClick={() => setShowPopup(true)}
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Đặt hàng thành công!</h3>
            <button
  onClick={() => {
    clearCart();
    setTimeout(() => {
      navigate("/cart");
    }, 100); 
  }}
>
  OK
</button>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
