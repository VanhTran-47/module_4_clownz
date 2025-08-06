import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Form, Alert } from 'react-bootstrap';
import Header from "../components/layout/Header";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import "../pages/Login.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.get('http://localhost:8000/users');
            const user = res.data.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('authToken', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }));
                navigate('/');
            } else {
                setError('Email hoặc mật khẩu không đúng');
            }
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError('Không thể kết nối đến server');
        } finally {
            setLoading(false);
        }
    };

    // Fix: Toggle password visibility function
    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <>
            <Header />
            <Navigation />

            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '100vh', backgroundColor: '#f2f2f2' }}
            >
                <div className="p-4 shadow-sm rounded bg-white" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center mb-4" style={{ color: '#111111' }}>Đăng nhập</h2>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: '#111111' }}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Nhập email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label style={{ color: '#111111' }}>Mật khẩu</Form.Label>
                            <div className="password-input-wrapper" style={{ position: 'relative' }}>
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="toggle-password-icon"
                                    onClick={togglePassword}
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

                        <Button
                          type="submit"
                          className="w-100 mb-3"
                          style={{ backgroundColor: '#000000', borderColor: '#000000' }}
                          disabled={loading}
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </Button>

                        <div className="text-center">
                            <p className="mb-0" style={{ color: '#111111' }}>
                                Chưa có tài khoản?{' '}
                                <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#222222' }}>
                                    Đăng ký ngay
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

export default LoginPage;
