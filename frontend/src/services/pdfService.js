// // // import { api } from './authService';

// // // // PDF Service
// // // const pdfService = {
// // //   // Upload PDF for summarization
// // //   uploadPDF: async (file, onUploadProgress) => {
// // //     try {
// // //       const formData = new FormData();
// // //       formData.append('pdf', file);

// // //       const response = await api.post('/api/pdf/upload', formData, {
// // //         headers: {
// // //           'Content-Type': 'multipart/form-data'
// // //         },
// // //         onUploadProgress: onUploadProgress
// // //       });
// // //       return { success: true, data: response.data };
// // //     } catch (error) {
// // //       const message = error.response?.data?.message || 
// // //                       error.response?.data?.error || 
// // //                       'Failed to upload and summarize PDF.';
// // //       return { success: false, error: message };
// // //     }
// // //   },

// // //   // Get a specific summary by ID
// // //   getSummary: async (id) => {
// // //     try {
// // //       const response = await api.get(`/api/pdf/summary/${id}`);
// // //       return { success: true, data: response.data };
// // //     } catch (error) {
// // //       const message = error.response?.data?.message || 
// // //                       error.response?.data?.error || 
// // //                       'Failed to fetch summary.';
// // //       return { success: false, error: message };
// // //     }
// // //   }
// // // };

// // // export default pdfService;

// // import axios from 'axios';

// // const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// // API.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // export const uploadPDF = (file) => {
// //   const formData = new FormData();
// //   formData.append('pdf', file);
// //   return API.post('/pdf/upload', formData, {
// //     headers: { 'Content-Type': 'multipart/form-data' }
// //   });
// // };
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const uploadPDF = (file) => {
//   const formData = new FormData();
//   formData.append('pdf', file);
//   return API.post('/pdf/upload', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' }
//   });
// };

// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api'
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');

//   // 🔴 ADD THIS LINE
//   console.log("TOKEN BEING SENT:", token);

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


// export const uploadPDF = async (file, summaryType) => {
//   const formData = new FormData();
//   formData.append('pdf', file);
//   formData.append("summaryType", summaryType);

//   const response = await API.post('/pdf/upload', formData);
//   return response.data;
// };




import axios from 'axios';

const API_BASE_URL = `${(process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '')}/api`;

const API = axios.create({
  baseURL: API_BASE_URL
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  console.log("TOKEN BEING SENT:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired tokens (401 Unauthorized)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Upload PDF for summarization
 * @param {File} file
 * @param {string} summaryType - short | medium | detailed
 * @param {number|null} startPage
 * @param {number|null} endPage
 */
export const uploadPDF = async (
  file,
  summaryType,
  startPage = null,
  endPage = null
) => {
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('summaryType', summaryType);

  // 🔹 NEW: Optional page range
  if (startPage !== null && endPage !== null) {
    formData.append('startPage', startPage);
    formData.append('endPage', endPage);
  }

  const response = await API.post('/pdf/upload', formData);
  return response.data;
};

/**
 * Select a heading for a summary
 * @param {string} id - Summary ID
 * @param {string} heading - The selected heading string
 */
export const selectHeading = async (id, heading) => {
  const response = await API.put(`/pdf/summary/${id}/heading`, { heading });
  return response.data;
};
