import axios from 'axios';

const BASE_URL = '/products';

// User-accessible operations
const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories/`);
  return response.data;
};

const getCategory = async (slug) => {
  const response = await axios.get(`${BASE_URL}/categories/${slug}/`);
  return response.data;
};

const getProducts = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/products/`, { params });
  return response.data;
};

const getProduct = async (slug) => {
  const response = await axios.get(`${BASE_URL}/products/${slug}/`);
  return response.data;
};

// Wishlist operations (user-specific)
const getWishlist = async () => {
  const response = await axios.get(`${BASE_URL}/wishlist/`);
  return response.data;
};

const addToWishlist = async (productId) => {
  const response = await axios.post(`${BASE_URL}/wishlist/`, { product: productId });
  return response.data;
};

const removeFromWishlist = async (id) => {
  await axios.delete(`${BASE_URL}/wishlist/${id}/`);
};

// Admin-only operations
const adminService = {
  createCategory: async (categoryData) => {
    const response = await axios.post(`${BASE_URL}/categories/`, categoryData);
    return response.data;
  },

  updateCategory: async (slug, categoryData) => {
    const response = await axios.put(`${BASE_URL}/categories/${slug}/`, categoryData);
    return response.data;
  },

  partialUpdateCategory: async (slug, categoryData) => {
    const response = await axios.patch(`${BASE_URL}/categories/${slug}/`, categoryData);
    return response.data;
  },

  deleteCategory: async (slug) => {
    await axios.delete(`${BASE_URL}/categories/${slug}/`);
  },

  createProduct: async (productData) => {
    const response = await axios.post(`${BASE_URL}/products/`, productData);
    return response.data;
  },

  updateProduct: async (slug, productData) => {
    const response = await axios.put(`${BASE_URL}/products/${slug}/`, productData);
    return response.data;
  },

  partialUpdateProduct: async (slug, productData) => {
    const response = await axios.patch(`${BASE_URL}/products/${slug}/`, productData);
    return response.data;
  },

  deleteProduct: async (slug) => {
    await axios.delete(`${BASE_URL}/products/${slug}/`);
  }
};

const productService = {
  // Public user operations
  getCategories,
  getCategory,
  getProducts,
  getProduct,
  
  // Wishlist operations
  getWishlist,
  addToWishlist,
  removeFromWishlist,

  // Admin operations
  admin: adminService
};

export default productService;