import React from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

 const Data = [
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

export default function Products() {
  return (
    <>
      <Header />
      <Navigation />
      <div className="product-section">
        <h2 className="section-title">Tất cả sản phẩm</h2>
        <ProductCard product={Data} />
      </div>
      <Footer />
    </>
  );
}
