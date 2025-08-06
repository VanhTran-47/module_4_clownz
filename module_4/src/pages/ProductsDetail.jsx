import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; 
import {
  FaStar,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import "../pages/ProductsDetail.css";

export default function ProductsDetail() {
  const product = {
    id: 1, 
    name: "Áo thun Clownz",
    price: 320000,
    description:
      "Mẫu T-shirt sử dụng vải 280 gsm dầy dặn, được giặt chống co...",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đen", "Trắng", "Xám", "Xanh Navy"],
    rating: 4.5,
    image: "/images/product-01.png",
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
    });
    navigate("/itemcart");
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
    });
    navigate("/payment");
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star full" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <>
      <Header />
      <Navigation />
      <div className="products-detail-page">
        <div className="products-detail-container">
          {/* ảnh sản phẩm */}
          <div className="thumbnails-column">
            {[0, 1, 2, 3].map((_, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  selectedImage === index ? "active" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src="/images/product-01.png"
                  alt={`Product view ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* ảnh chính */}
          <div className="main-image-column">
            <div className="main-image-container">
              <img src="/images/product-01.png" alt="Main product" />
              <button className="nav-button prev" onClick={handlePrevImage}>
                <FaChevronLeft />
              </button>
              <button className="nav-button next" onClick={handleNextImage}>
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* thông tin sản phẩm */}
          <div className="info-column">
            <h1 className="product-title">{product.name}</h1>

            <div className="product-price">
              {product.price.toLocaleString("vi-VN")}₫
            </div>

            <div className="product-rating">
              {renderStars()}
              <span className="rating-text">{product.rating}/5</span>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="color-selection">
              <h3>Màu sắc: {selectedColor}</h3>
              <div className="color-options">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className={`color-option ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>

            <div className="size-selection">
              <h3>Kích thước: {selectedSize}</h3>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selection">
              <h3>Số lượng:</h3>
              <div className="quantity-control">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="buy-later" onClick={handleAddToCart}>
                THÊM VÀO GIỎ
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                MUA NGAY
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
