import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  console.log(product)
  if (!product) {
    return <div className="product-card">Không có dữ liệu sản phẩm</div>;
  }

  return (
    <>
    {
      product.map((item, index) => (
        <div className="product-card">
          <div key={index}>
            <a href="/detail">
            <img src={item.image} alt={item.name} />
          </a>
            <div className="product-info">
              <h5 className="product-name">{item.name}</h5>
              <p className="product-category">{item.category}</p>
              <p className="product-price">{item.price}</p>
              <Link to="/itemcart" className="product-button">
  THÊM VÀO GIỎ HÀNG
</Link>


            </div>
          </div>
        </div>
        ))
      }
      </>
  );
}
