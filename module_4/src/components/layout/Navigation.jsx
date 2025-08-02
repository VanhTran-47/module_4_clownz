import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="nav-link">Trang chủ</a>
      <NavLink
      to="/products"
      className={({ isActive }) =>
      isActive ? "nav-link active" : "nav-link"
      }
      >
        SẢN PHẨM
      </NavLink>
      <a href="#" className="nav-link">Stand for Northside</a>
      <a href="#" className="nav-link">Loudzone</a>
      <a href="/blog" className="nav-link">Blog</a>
      <a href="#" className="nav-link">Liên hệ</a>
    </nav>
  );
}
