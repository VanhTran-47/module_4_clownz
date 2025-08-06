import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_PRODUCTS = "http://localhost:8000/products";
const API_CATEGORIES = "http://localhost:8000/categories";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        id: null,
        name: "",
        price: 0,
        category: "",
        stock: 0,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    axios.get(API_PRODUCTS),
                    axios.get(API_CATEGORIES),
                ]);
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
            }
        };
        fetchData();
    }, []);

    const handleClose = () => {
        setShowModal(false);
        setCurrentProduct({ id: null, name: "", price: 0, category: "", stock: 0 });
        setIsEditing(false);
    };

    const handleShowAdd = () => {
        setShowModal(true);
        setIsEditing(false);
    };

    const handleShowEdit = (product) => {
        setCurrentProduct(product);
        setShowModal(true);
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                const res = await axios.put(`${API_PRODUCTS}/${currentProduct.id}`, currentProduct);
                setProducts(products.map((p) => (p.id === currentProduct.id ? res.data : p)));
            } catch (err) {
                console.error("Lỗi khi cập nhật sản phẩm:", err);
            }
        } else {
            try {
                const res = await axios.post(API_PRODUCTS, {
                    ...currentProduct,
                    createdAt: new Date().toISOString(),
                });
                setProducts([...products, res.data]);
            } catch (err) {
                console.error("Lỗi khi thêm sản phẩm:", err);
            }
        }
        handleClose();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            try {
                await axios.delete(`${API_PRODUCTS}/${id}`);
                setProducts(products.filter((p) => p.id !== id));
            } catch (err) {
                console.error("Lỗi khi xóa sản phẩm:", err);
            }
        }
    };

    return (
        <Card className="p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-dark m-0">Quản lý sản phẩm</h2>
                <div className="d-flex gap-2">
                    <Button variant="outline-secondary" onClick={() => navigate("/admin")}>
                        Quay lại Admin
                    </Button>
                    <Button variant="primary" onClick={handleShowAdd}>
                        Thêm sản phẩm
                    </Button>
                </div>
            </div>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Tồn kho</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price.toLocaleString()} VND</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Button variant="warning" size="sm" onClick={() => handleShowEdit(product)}>
                                        Sửa
                                    </Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
                                        Xóa
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentProduct.name}
                                onChange={handleInputChange}
                                placeholder="Nhập tên sản phẩm"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={currentProduct.price}
                                onChange={handleInputChange}
                                placeholder="Giá sản phẩm"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Select
                                name="category"
                                value={currentProduct.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">-- Chọn danh mục --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số lượng tồn kho</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={currentProduct.stock}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleClose} className="me-2">
                                Hủy
                            </Button>
                            <Button variant="primary" type="submit">
                                {isEditing ? "Cập nhật" : "Lưu"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </Card>
    );
};

export default ProductManagement;
