import { Link } from "react-router-dom";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ProductCard from "./components/layout/ProductCard";
import "./styles/globals.css";
import Banner from "./components/layout/Banner";
import Products from './pages/products';

function App() {

  const sampleArr = [
    {
      id: 1,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 2,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 3,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 4,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 5,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 6,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 7,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 8,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 9,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
    {
      id: 10,
      image: "/images/product-01.png",
      name: "Áo Thun Clownz",
      category: "T-Shirt",
      price: "320,000 VNĐ"
    },
  ]


  return (
    <>
      <Header />
      <Navigation />
      <Banner />
      <div className="product-section">
        <h2 className="section-title">Tất cả sản phẩm</h2>
        <div className="product-grid">
          <ProductCard product={sampleArr} />
        </div>
        <div className="view-all-button-wrapper">
          <Link to="/products" className="view-all-button" onClick={() => window.scrollTo(0, 0)}>
            XEM TẤT CẢ SẢN PHẨM
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
