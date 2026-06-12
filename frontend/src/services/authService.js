// // import axios from 'axios';

// // // Base URL for API
// // const API_BASE_URL = 'http://localhost:5000';

// // // Create axios instance with default config
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }
// // });

// // // Request interceptor to add auth token
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor to handle errors
// // api.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     // Handle 401 unauthorized errors
// //     if (error.response?.status === 401) {
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('user');
// //       window.location.href = '/login';
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // // Authentication Service
// // const authService = {
// //   // Register new user
// //   register: async (userData) => {
// //     try {
// //       const response = await api.post('/api/auth/register', userData);
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Registration failed. Please try again.';
// //       return { success: false, error: message };
// //     }
// //   },

// //   // Login user
// //   login: async (credentials) => {
// //     try {
// //       const response = await api.post('/api/auth/login', credentials);
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Login failed. Please check your credentials.';
// //       return { success: false, error: message };
// //     }
// //   },

// //   // Get user profile
// //   getProfile: async () => {
// //     try {
// //       const response = await api.get('/api/auth/profile');
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Failed to fetch profile.';
// //       return { success: false, error: message };
// //     }
// //   },

// //   // Update user profile
// //   updateProfile: async (userData) => {
// //     try {
// //       const response = await api.put('/api/auth/profile', userData);
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Failed to update profile.';
// //       return { success: false, error: message };
// //     }
// //   }
// // };

// // // Export the api instance for other services
// // export { api };
// // export default authService;

// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// // Add token to requests
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const register = (data) => API.post('/auth/register', data);
// export const login = (data) => API.post('/auth/login', data);


import axios from 'axios';
API_URL = process.env.REACT_APP_API_URL;
const API = axios.create({
  baseURL: `${API_URL}/api`
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);