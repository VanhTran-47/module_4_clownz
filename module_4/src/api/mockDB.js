import data from "../../data/dbase.json"

export const fetchOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data.orders || []), 500);
  });
};

export const updateOrderStatus = (orderId, newStatus) => {
  return new Promise((resolve) => {
    const order = data.orders.find(order => order.id === orderId);
    if (order) {
      order.status = newStatus;
      order.updatedAt = new Date().toISOString();
      setTimeout(() => resolve(order), 300);
    } else {
      throw new Error('Order not found');
    }
  });
};