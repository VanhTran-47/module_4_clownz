import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {Button, Form, Alert} from 'react-bootstrap';
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import "../pages/Register.css";

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Email không hợp lệ');
            return false;
        }

        if (!/^\d{10,11}$/.test(formData.phone)) {
            setError('Số điện thoại phải có 10-11 số');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!validateForm()) {
            setLoading(false);
            return;
        }

        try {
            const res = await axios.get('http://localhost:8000/users');
            if (res.data.some(user => user.email === formData.email)) {
                setError('Email đã được đăng ký');
                setLoading(false);
                return;
            }

            await axios.post('http://localhost:8000/users', {
                ...formData,
                role: 'user',
                createdAt: new Date().toISOString()
            });

            setSuccess('Đăng ký thành công! Đang chuyển hướng...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            console.error('Lỗi đăng ký:', err);
            setError('Đã xảy ra lỗi khi đăng ký');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Navigation />


        <div className="d-flex justify-content-center align-items-center"
             style={{minHeight: '100vh', backgroundColor: '#f2f2f2', paddingTop: '100px', paddingBottom: '80px' }}>
            <div className="p-4 shadow-sm rounded bg-white" style={{width: '100%', maxWidth: '400px'}}>
                <h2 className="text-center mb-4" style={{ color: '#222222' }}>Đăng ký tài khoản</h2>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#222222' }}>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Nhập họ tên"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#222222' }}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Nhập email"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#222222' }}>Số điện thoại</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Nhập số điện thoại"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
  <Form.Label style={{ color: '#222222' }}>Mật khẩu</Form.Label>
  <div style={{ position: 'relative' }}>
    <Form.Control
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
      style={{ paddingRight: '2.5rem' }}
    />
    <span
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#666'
      }}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label style={{ color: '#222222' }}>Xác nhận mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Nhập lại mật khẩu"
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                        style={{ backgroundColor: '#000000', borderColor: '#000000' }}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng ký'}
                    </Button>

                    <div className="text-center">
                        <p className="mb-0" style={{ color: '#222222' }}>
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#222222' }}>
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>

          <Footer />
        </>
    );
}

export default RegisterPage;