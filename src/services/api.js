// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// console.log('[API] Conectando a:', API_BASE_URL);

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('auth_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//       console.log('[API] Token agregado');
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn('[API] Token expirado');
//       localStorage.removeItem('auth_token');
//       localStorage.removeItem('user_data');
//       window.dispatchEvent(new Event('eco-closet-auth'));
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
