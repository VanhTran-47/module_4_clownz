import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {Routes, Route, Link} from "react-router-dom";
import CategoryManagement from "../pages/CategoryManagement";
import UserManagement from "../pages/UserManagement";
import ProductManagement from "../pages/ProductManagement";
import "../pages/AdminPage.css"; 


function AdminPage() {
    const authData = JSON.parse(localStorage.getItem("authToken")) || {};
    const {name, role} = authData;

    return (
        <div className="d-flex" style={{minHeight: "100vh"}}>
            <div className="bg-dark text-white p-3" style={{width: "240px"}}>
                <h3 className="text-center mb-4" style={{ color: "#ffffff" }}>CLOWNZ Admin</h3>
                <div className="text-center mb-4">
                    <FaUser className="fs-4 mb-2"/>
                    <p className="text-center" style={{ color: "#ffffff" }}></p>
                 {/* <small className="text-muted">{role || "Quản trị viên"}</small> */}
                </div>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/admin" className="nav-link text-white">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/categories" className="nav-link text-white">
                            Danh mục
                        </Link>
                    </li>

                </ul>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/admin/users" className="nav-link text-white">
                            Người dùng
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/products" className="nav-link text-white">
                            Sản phẩm
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/orders" className="nav-link text-white">
                            Quản lý đơn hàng
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex-grow-1 d-flex flex-column">
                <nav className="navbar navbar-light bg-light px-4 shadow-sm">
                    <form className="d-flex align-items-center" style={{width: "300px"}}>

                    </form>
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                localStorage.removeItem('authToken');
                                window.location.href = '/login';
                            }}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </nav>


                <div className="p-4 bg-light flex-grow-1">
                    <Routes>
                        <Route index element={<Dashboard/>}/>
                        <Route path="categories" element={<CategoryManagement/>}/>
                        <Route path="users" element={<UserManagement/>}/>
                        <Route path="products" element={<ProductManagement/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

function Dashboard() {

    const stats = {
        totalProducts: 12,
        weeklyRevenue: 4250000,
        monthlyRevenue: 1850000,
        totalUsers: 4,
        newUsersThisWeek: 1
    };

    return (
        <div className="dashboard-container">
            <h2 className="text-success mb-4">Quản trị hệ thống</h2>

            <div className="row">

                <div className="col-md-3 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Tổng sản phẩm</h5>
                            <h2 className="text-primary">{stats.totalProducts}</h2>
                            <p className="text-muted mb-0">Sản phẩm hiện có</p>
                        </div>
                    </div>
                </div>


                <div className="col-md-3 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Doanh số tuần</h5>
                            <h2 className="text-success">{stats.weeklyRevenue.toLocaleString()}₫</h2>
                            <p className="text-muted mb-0">Tuần này</p>
                        </div>
                    </div>
                </div>


                <div className="col-md-3 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Doanh số tháng</h5>
                            <h2 className="text-info">{stats.monthlyRevenue.toLocaleString()}₫</h2>
                            <p className="text-muted mb-0">Tháng này</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <h5 className="card-title">Người dùng</h5>
                            <h2 className="text-warning">{stats.totalUsers}</h2>
                            <p className="text-muted mb-0">{stats.newUsersThisWeek} mới (tuần)</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="mt-4">
                <p>Chào mừng bạn đến với trang quản trị hệ thống.</p>
            </div>
        </div>
    );
}

export default AdminPage;