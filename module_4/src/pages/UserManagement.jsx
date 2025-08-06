import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  Form,
  Badge,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaUserShield, FaUser, FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_USERS = "http://localhost:8000/users";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: "",
    email: "",
    role: "User",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem("authToken")) || {};
  const currentAdminRole = authUser.role || "User";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_USERS);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Không thể tải người dùng");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setCurrentUser({
      id: null,
      username: "",
      email: "",
      role: "User",
      password: "",
    });
    setIsEditing(false);
  };

  const handleShowAdd = () => {
    setShowModal(true);
    setIsEditing(false);
  };

  const handleShowEdit = (user) => {
    setCurrentUser({ ...user, password: "" });
    setShowModal(true);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const updateData = {
          username: currentUser.username,
          email: currentUser.email,
          role: currentUser.role,
        };
        if (currentUser.password) {
          updateData.password = currentUser.password;
        }
        const res = await axios.put(
          `${API_USERS}/${currentUser.id}`,
          updateData
        );
        setUsers(users.map((u) => (u.id === currentUser.id ? res.data : u)));
      } else {
        const res = await axios.post(API_USERS, {
          ...currentUser,
          createdAt: new Date().toISOString(),
        });
        setUsers([...users, res.data]);
      }
      handleClose();
    } catch (err) {
      console.error("Error saving user:", err);
      alert(
        "Lỗi khi lưu người dùng: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await axios.delete(`${API_USERS}/${id}`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert(
          "Lỗi khi xóa người dùng: " +
            (err.response?.data?.message || err.message)
        );
      }
    }
  };

  const canEditDelete = (userRole) =>
    currentAdminRole === "Admin" || userRole !== "Admin";

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error)
    return (
      <Alert variant="danger" className="text-center my-5">
        {error}
      </Alert>
    );

  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 text-dark d-flex align-items-center">
          <FaUserShield className="me-2" />
          Quản lý người dùng
        </h3>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => navigate("/admin")}>
            <FaArrowLeft className="me-1" />
            Quay lại Admin
          </Button>
          <Button variant="primary" onClick={handleShowAdd}>
  <FaPlus className="me-1" />
  Thêm người dùng
</Button>

        </div>
      </div>

      <Table striped bordered hover responsive className="rounded overflow-hidden">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tài khoản</th>
            <th>Email</th>
            <th>Quyền</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Badge
                  bg={user.role === "Admin" ? "danger" : "primary"}
                  className="d-flex align-items-center gap-1"
                >
                  {user.role === "Admin" ? <FaUserShield /> : <FaUser />}
                  {user.role}
                </Badge>
              </td>
              <td>
                <Badge bg="success">Đang hoạt động</Badge>
              </td>
              <td>
                {canEditDelete(user.role) ? (
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleShowEdit(user)}
                      disabled={user.id === authUser.id}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      disabled={user.id === authUser.id}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ) : (
                  <span className="text-muted">Không được phép</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Cập nhật người dùng" : "Thêm người dùng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tài khoản</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
                required
                minLength={3}
                placeholder="Nhập tên tài khoản"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
                required
                placeholder="example@gmail.com"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phân quyền</Form.Label>
              <Form.Select
                name="role"
                value={currentUser.role}
                onChange={handleInputChange}
                disabled={currentAdminRole !== "Admin"}
              >
                <option value="User">Người dùng</option>
                <option value="Admin">Quản trị viên</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {isEditing
                  ? "Mật khẩu mới (bỏ trống nếu không đổi)"
                  : "Mật khẩu"}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
                required={!isEditing}
                minLength={6}
                placeholder="Nhập mật khẩu"
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleClose}>
                Hủy
              </Button>
              <Button variant="primary" type="submit">
                {isEditing ? "Cập nhật" : "Tạo người dùng"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default UserManagement;
