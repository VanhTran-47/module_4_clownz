import { Link } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import "./styles/globals.css";
import Banner from "./components/Banner";

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
      id: 7,
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
      id: 7,
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
      id: 7,
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
      id: 7,
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
      id: 7,
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
          <Link to="/products" className="view-all-button">
            XEM TẤT CẢ SẢN PHẨM
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
