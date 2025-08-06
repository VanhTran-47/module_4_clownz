import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  Form,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaTags, FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/categories";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // dùng để điều hướng

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(API_URL);
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
        setError("Không thể tải danh mục");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentCategory({ id: null, name: "", description: "" });
    setIsEditing(false);
  };

  const handleShowAdd = () => {
    setShowModal(true);
    setIsEditing(false);
  };

  const handleShowEdit = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const res = await axios.put(
          `${API_URL}/${currentCategory.id}`,
          currentCategory
        );
        setCategories(
          categories.map((cat) =>
            cat.id === currentCategory.id ? res.data : cat
          )
        );
      } else {
        const res = await axios.post(API_URL, {
          ...currentCategory,
          createdAt: new Date().toISOString(),
        });
        setCategories([...categories, res.data]);
      }
      handleClose();
    } catch (err) {
      console.error("Lỗi khi lưu danh mục:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setCategories(categories.filter((cat) => cat.id !== id));
      } catch (err) {
        console.error("Lỗi khi xóa danh mục:", err);
      }
    }
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error)
    return <Alert variant="danger" className="text-center my-5">{error}</Alert>;

  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 text-dark d-flex align-items-center">
          <FaTags className="me-2" />
          Quản lý danh mục
        </h3>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => navigate("/admin")}>
            <FaArrowLeft className="me-1" />
            Quay lại Admin
          </Button>
          <Button variant="primary" onClick={handleShowAdd}>
            Thêm danh mục
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive className="rounded overflow-hidden">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleShowEdit(category)}
                  >
                    <FaEdit /> Sửa
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    <FaTrash /> Xóa
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Cập nhật danh mục" : "Thêm danh mục"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentCategory.name}
                onChange={handleInputChange}
                required
                placeholder="Nhập tên danh mục"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentCategory.description}
                onChange={handleInputChange}
                placeholder="Nhập mô tả (nếu có)"
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleClose}>
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

export default CategoryManagement;
