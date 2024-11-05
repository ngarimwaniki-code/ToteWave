import axios from 'axios';

const BASE_URL = '/orders';

// User-accessible operations
const getOrders = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/`, { params });
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}/`);
  return response.data;
};

const createOrder = async (orderData) => {
  const response = await axios.post(`${BASE_URL}/`, orderData);
  return response.data;
};

const createPaymentIntent = async (orderId) => {
  const response = await axios.post(`${BASE_URL}/${orderId}/create_payment_intent/`);
  return response.data;
};

// Admin-only operations
const adminService = {
  updateOrder: async (id, orderData) => {
    const response = await axios.put(`${BASE_URL}/${id}/`, orderData);
    return response.data;
  },

  partialUpdateOrder: async (id, orderData) => {
    const response = await axios.patch(`${BASE_URL}/${id}/`, orderData);
    return response.data;
  },

  deleteOrder: async (id) => {
    await axios.delete(`${BASE_URL}/${id}/`);
  }
};

const orderService = {
  // Public user operations
  getOrders,
  getOrder,
  createOrder,
  createPaymentIntent,

  // Admin operations
  admin: adminService
};

export default orderService;