import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://locomate.app';

export const api = axios.create({
  baseURL: `${BASE_URL}/api/v1/admin`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 - redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_access_token');
      localStorage.removeItem('admin_refresh_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);
