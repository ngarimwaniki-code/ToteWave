import axios from 'axios';
import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // Enable sending cookies with requests
});

// Add authentication interceptor
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

export const webAuthnService = {
  async registerWebAuthn() {
    try {
      // Get registration options for the currently logged-in user
      const optionsRes = await api.post('/users/register-webauthn/');
      const options = optionsRes.data;
      const regResult = await startRegistration(options);
      return regResult;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to register device');
      }
      throw error;
    }
  },

  async verifyWebAuthnRegistration(verificationData) {
    try {
      const response = await api.post('/users/verify-webauthn-registration/', verificationData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to verify device registration');
      }
      throw error;
    }
  },

  async verifyWebAuthnAuth(authData) {
    try {
      const optionsRes = await api.post('/users/verify-webauthn-auth/');
      const options = optionsRes.data;
      const authResult = await startAuthentication(options);
      const verificationRes = await api.post('/users/verify-webauthn-auth/', authResult);
      return verificationRes.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to verify authentication');
      }
      throw error;
    }
  },

  async verifyAdminStatus() {
    try {
      const response = await api.post('/users/verify-admin-status/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Failed to verify admin status');
      }
      throw error;
    }
  },

  async resendVerificationEmail(userData) {
    try {
      const response = await api.post('/users/resend-verification-email/', userData);
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
  }
};

export default webAuthnService;