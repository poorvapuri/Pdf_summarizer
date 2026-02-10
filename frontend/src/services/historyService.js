// // import { api } from './authService';

// // // History Service
// // const historyService = {
// //   // Get all summaries history
// //   getHistory: async () => {
// //     try {
// //       const response = await api.get('/api/history');
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Failed to fetch history.';
// //       return { success: false, error: message };
// //     }
// //   },

// //   // Get a specific history item
// //   getHistoryItem: async (id) => {
// //     try {
// //       const response = await api.get(`/api/history/${id}`);
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Failed to fetch history item.';
// //       return { success: false, error: message };
// //     }
// //   },

// //   // Delete a summary from history
// //   deleteHistory: async (id) => {
// //     try {
// //       const response = await api.delete(`/api/history/${id}`);
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Failed to delete summary.';
// //       return { success: false, error: message };
// //     }
// //   },

// //   // Clear all history
// //   clearHistory: async () => {
// //     try {
// //       const response = await api.delete('/api/history');
// //       return { success: true, data: response.data };
// //     } catch (error) {
// //       const message = error.response?.data?.message || 
// //                       error.response?.data?.error || 
// //                       'Failed to clear history.';
// //       return { success: false, error: message };
// //     }
// //   }
// // };

// // export default historyService;

// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export const getHistory = () => API.get('/history');
// export const deleteHistory = (id) => API.delete(`/history/${id}`);

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getHistory = () => API.get('/history');
export const deleteHistory = (id) => API.delete(`/history/${id}`);