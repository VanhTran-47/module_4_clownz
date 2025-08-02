import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import ProductCard from "../components/layout/ProductCard";
import Footer from "../components/layout/Footer";
import '../styles/globals.css';


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
      name: "Mũ LZ Cap",
      category: "Caps",
      price: "220,000 VNĐ"
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
      name: "Hoodie Clownz",
      category: "Hoodie",
      price: "20,000 VNĐ"
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

  ];

export default function Products() {
  return (
    <>
      <Header />
      <Navigation />
      <div className="product-section">
        <h2 className="products-title">Tất cả sản phẩm</h2>
      <div className="flex items-center mb-4">
  <span className="text-black font-semibold tracking-widest uppercase text-sm">DANH MỤC</span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    color="#111111"
    width="24"
    height="24"
    fill="none"
    viewBox="0 2 24 24"
    stroke="currentColor"
    strokeWidth="2"
    className="ml-[4px] inline-block transform translate-x-[4px]"

  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</div>
        <div className="product-grid">
          <ProductCard product={sampleArr} />
        </div>
      </div>
      <Footer />
    </>
  );
}
