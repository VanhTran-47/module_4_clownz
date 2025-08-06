import { FaMapMarkerAlt, FaPhoneAlt, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className="topbar">
      {/* Bên trái: ẩn khi <1024px */}
      <div className="topbar-left hide-on-small">
        <span className="info-group">
          <FaMapMarkerAlt className="icon" />
          Địa chỉ: Việt Nam
        </span>
        <span className="info-group phone">
          <FaPhoneAlt className="icon" />
          SĐT: 058660 8660
        </span>
      </div>

      {/* Giữa: Logo */}
      <div className="logo">
        <h1>CLOWNZ</h1>
      </div>

      {/* Bên phải: icon căn phải */}
      <div className="topbar-right">
        <div className="right-item">
          <FaSearch className="icon" />
        </div>

        <div className="account-menu">
  <div className="account-link">
    <FaUser className="account-icon" />
    <span className="cart-text">TÀI KHOẢN</span>
  </div>
  <div className="dropdown-menu">
    {/* <Link to="/admin" className="dropdown-item">Admin</Link> */}
    <Link to="/login" className="dropdown-item">Đăng nhập / Đăng ký</Link>
  </div>
</div>


        <div className="cart-item hide-label-on-small">
          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-text">Giỏ hàng</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
