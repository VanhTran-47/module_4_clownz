import Banner from "../components/Banner";

export default function Home({ products = [] }) {
  return (
    <div className="layout">
      <Banner />

      <div className="site-container">
        <main className="content">
          <h2>TẤT CẢ SẢN PHẨM</h2>
          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.image} alt={p.title} />
                <h3 className="product-name">{p.title}</h3>
                <p className="product-category">{p.category}</p>
                <p className="product-price">${p.price}</p>
                <button className="add-to-cart">Thêm vào giỏ hàng</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

