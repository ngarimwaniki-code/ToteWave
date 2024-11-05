import axios from 'axios';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user?.access) {
        config.headers.Authorization = `Bearer ${user.access}`;
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
    }
  }
  return config;
});

const authService = {
  async login(email, password) {
    const response = await api.post('/token/', {
      email,
      password,
    });
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/users/', userData);
    return response.data;
  },

  async verifyToken(token) {
    try {
      await api.post('/token/refresh/', { token });
      return true;
    } catch (error) {
      return false;
    }
  },

  async refreshToken(refreshToken) {
    const response = await api.post('/token/refresh/', {
      refresh: refreshToken,
    });
    if (response.data.access) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          user.access = response.data.access;
          localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          console.error('Failed to update user token:', error);
        }
      }
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      return null;
    }
  },

  async getProfile() {
    const response = await api.get('/users/profile/');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/users/profile/', profileData);
    return response.data;
  },

  
  
  async registerWebAuthnDevice() {
    try {
      const optionsRes = await api.post('/users/register-webauthn/');
      const options = optionsRes.data;
      const regResult = await startRegistration(options);
      const verificationRes = await api.post('/users/verify-webauthn-registration/', regResult);
      return verificationRes.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to register WebAuthn device');
      }
      throw error;
    }
  },

  async verifyAdminStatus() {
    try {
      const optionsRes = await api.post('/users/verify-admin-status/');
      const options = optionsRes.data;
      const authResult = await startAuthentication(options);
      const verificationRes = await api.post('/users/verify-webauthn-auth/', authResult);
      return verificationRes.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to verify admin status');
      }
      throw error;
    }
  },

  async resendVerificationEmail(email) {
    try {
      const response = await api.post('/users/resend_verification_email/', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to resend verification email');
      }
      throw error;
    }
  },

  async verifyEmail(token) {
    try {
      const response = await api.get(`/users/verify-email/${token}/`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Invalid or expired verification token');
      }
      throw error;
    }
  },

  async checkEmailVerificationStatus() {
    try {
      const response = await api.get('/users/verify_email/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to check email verification status');
      }
      throw error;
    }
  }
};

export default authService;