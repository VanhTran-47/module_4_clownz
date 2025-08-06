import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Spinner, Alert, Card, Row, Col } from 'react-bootstrap';
import { FaCheck, FaTimes, FaEye, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { fetchOrders, updateOrderStatus } from '../api/mockDB';
import { useNavigate } from 'react-router-dom';
import '../pages/OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError('Không thể tải đơn hàng');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
    } catch (err) {
      setError(`Lỗi khi cập nhật đơn hàng #${orderId}`);
    }
  };

  const renderStatusBadge = (status) => {
    const variants = {
      pending: { bg: 'warning', text: 'Chờ xử lý' },
      approved: { bg: 'success', text: 'Đã duyệt' },
      rejected: { bg: 'danger', text: 'Đã hủy' },
      completed: { bg: 'primary', text: 'Hoàn thành' }
    };
    const { bg, text } = variants[status] || { bg: 'secondary', text: 'Không xác định' };
    return <Badge bg={bg}>{text}</Badge>;
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error) return <Alert variant="danger" className="mx-3">{error}</Alert>;

  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0 text-dark d-flex align-items-center">
          <FaShoppingCart className="me-2" />
          Quản lý đơn hàng
        </h3>
        <Button variant="outline-secondary" onClick={() => navigate('/admin')}>
          <FaArrowLeft className="me-1" />
          Quay lại Admin
        </Button>
      </div>

      <Table striped bordered hover responsive className="rounded overflow-hidden">
        <thead className="table-dark">
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền (VNĐ)</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
              <td>{order.totalAmount.toLocaleString('vi-VN')}</td>
              <td>{renderStatusBadge(order.status)}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                  >
                    <FaEye />
                  </Button>

                  {order.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, 'approved')}
                      >
                        <FaCheck />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, 'rejected')}
                      >
                        <FaTimes />
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng #{selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Row>
              <Col md={6}>
                <h5 className="mb-3 text-primary">Thông tin khách hàng</h5>
                <p><strong>Tên:</strong> {selectedOrder.customerName}</p>
                <p><strong>Địa chỉ:</strong> {selectedOrder.shippingAddress}</p>
                <p><strong>SĐT:</strong> {selectedOrder.customerPhone}</p>
                <p><strong>Thanh toán:</strong> {selectedOrder.paymentMethod}</p>
              </Col>

              <Col md={6}>
                <h5 className="mb-3 text-primary">Thông tin đơn hàng</h5>
                <p><strong>Ngày đặt:</strong> {new Date(selectedOrder.orderDate).toLocaleString('vi-VN')}</p>
                <p><strong>Trạng thái:</strong> {renderStatusBadge(selectedOrder.status)}</p>
                <p><strong>Ghi chú:</strong> {selectedOrder.notes || 'Không có'}</p>
              </Col>

              <Col xs={12} className="mt-4">
                <h5 className="text-primary">Danh sách sản phẩm</h5>
                <Table striped bordered className="mt-3">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.price.toLocaleString('vi-VN')}₫</td>
                        <td>{item.quantity}</td>
                        <td>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h5 className="text-end mt-3">
                  Tổng cộng: <span className="text-success">{selectedOrder.totalAmount.toLocaleString('vi-VN')}₫</span>
                </h5>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default OrderManagement;
