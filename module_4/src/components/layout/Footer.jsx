export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {/* Cột 1: Logo và thông tin */}
        <div className="footer-column">
          <h2>CLOWNZ</h2>
          <p style={{ marginTop: '34px' }}>Ship COD toàn quốc</p>
          <p>FREESHIP đơn hàng từ 500.000₫</p>
        </div>

        {/* Cột 2: Liên hệ */}
        <div className="footer-column">
          <h5>Liên hệ</h5>
          <p>CLOWNZ STORE</p>
          <p>Địa chỉ: Số 5 ngách 2 ngõ 27 Huỳnh Thúc Kháng</p>
          <p>Email: duong@clownz.vn</p>
          <p>SĐT: 058660 8660</p>
        </div>

        {/* Cột 3: Chính sách */}
        <div className="footer-column">
          <h5>Chính sách</h5>
          <a href="#">Chính sách thành viên</a><br />
          <a href="#" style={{ marginTop: '16px', display: 'inline-block' }}>Chính sách đổi trả</a><br />
          <a href="#" style={{ marginTop: '16px', display: 'inline-block' }}>Chính sách vận chuyển</a>
        </div>

        {/* Cột 4: Đăng ký nhận tin */}
        <div className="footer-column">
          <h5>Đăng ký nhận tin</h5>
          <p>Nhận thông tin sản phẩm mới, khuyến mãi đặc biệt</p>
          <input
            type="email"
            placeholder="Email của bạn"
            style={{ padding: '8px', width: '100%', marginTop: '10px' }}
          />
          <button className="newsletter-button">ĐĂNG KÝ</button>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Bản quyền CLOWNZ STORE | Cung cấp bởi Sapo
      </div>
    </footer>
  );
}
