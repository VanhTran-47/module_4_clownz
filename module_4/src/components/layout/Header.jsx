import { FaMapMarkerAlt, FaPhoneAlt, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <div className="topbar">
      <h1>Hello anh em codegym mãi đỉnh !!!!</h1>
      <div className="topbar-left">
        <span className="info-group">
        <FaMapMarkerAlt className="icon" />
        Địa chỉ: Việt Nam
        </span>
        <span className="info-group phone">
        <FaPhoneAlt className="icon" />
        SĐT: 058660 8660
        </span>
      </div>
      <div className="logo">
        <h1>CLOWNZ</h1>
      </div>
      <div className="topbar-right">
        <div className="right-item">
          <FaSearch className="icon" />
        </div>
        <div className="account-item">
          <FaUser className="icon" />
          <a href="#" className="nav-link">Tài khoản</a>
        </div>
        <div className="cart-item">
          <FaShoppingCart className="icon" />
          <a href="#" className="nav-link">Giỏ hàng</a>
        </div>
      </div>
    </div>
  );
}
