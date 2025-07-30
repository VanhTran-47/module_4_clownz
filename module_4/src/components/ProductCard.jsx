
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
            <img src={item.image} alt={item.name} />
            <div className="product-info">
              <h5 className="product-name">{item.name}</h5>
              <p className="product-category">{item.category}</p>
              <p className="product-price">{item.price}</p>
              <button className="product-button">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        ))
      }
      </>
  );
}
