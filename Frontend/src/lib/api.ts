import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only try to refresh token for 401 errors and not for auth endpoints
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/')) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        await api.post('/auth/refresh');
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear token and redirect to login
        localStorage.removeItem('accessToken');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  getProfile: () => api.get('/auth/me'),
};

export const userAPI = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data: { name?: string; email?: string; avatar?: string }) =>
    api.put('/users/me', data),
  deleteAccount: () => api.delete('/users/me'),
  getStats: () => api.get('/users/me/stats'),
};

export const productAPI = {
  getProducts: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get('/products', { params }),
  getProduct: (id: string) => api.get(`/products/${id}`),
  createProduct: (data: { name: string; description?: string; price: number; images?: string[] }) =>
    api.post('/products', data),
  updateProduct: (id: string, data: { name?: string; description?: string; price?: number; images?: string[] }) =>
    api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  getStats: () => api.get('/products/stats/overview'),
  uploadImage: (id: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post(`/products/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteImage: (id: string, filename: string) =>
    api.delete(`/products/${id}/images/${filename}`),
};

export default api;
