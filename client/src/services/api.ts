import axios from 'axios';

// Use full URL to avoid proxy issues
const API_URL = 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/auth/register', data),
  getCurrentUser: () => 
    api.get('/auth/me'),
};

// Menu API
export const menuAPI = {
  getAll: (params?: any) => api.get('/menu', { params }),
  getById: (id: string) => api.get(`/menu/${id}`),
  getByCategory: (category: string) => api.get(`/menu/category/${category}`),
  getCategories: () => api.get('/menu/categories'),
  getFeatured: () => api.get('/menu/featured'),
  create: (data: any) => api.post('/menu', data),
  update: (id: string, data: any) => api.put(`/menu/${id}`, data),
  delete: (id: string) => api.delete(`/menu/${id}`),
  toggleAvailability: (id: string) => api.patch(`/menu/${id}/availability`),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  updateStatus: (id: string, status: string) => 
    api.patch(`/orders/${id}/status`, { status }),
};

// Reservations API
export const reservationsAPI = {
  getAll: () => api.get('/reservations'),
  getById: (id: string) => api.get(`/reservations/${id}`),
  create: (data: any) => api.post('/reservations', data),
  update: (id: string, data: any) => api.put(`/reservations/${id}`, data),
  delete: (id: string) => api.delete(`/reservations/${id}`),
  checkAvailability: (date: string, time: string, guests: number) =>
    api.post('/reservations/check-availability', { date, time, guests }),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getRecentOrders: () => api.get('/dashboard/recent-orders'),
  getRevenueChart: (period: string) => api.get(`/dashboard/revenue?period=${period}`),
};

export default api;
