import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { API_BASE_URL } from './environment';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Replace with your API base URL
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  config => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized, clear token
      useAuthStore.getState().clearToken();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
