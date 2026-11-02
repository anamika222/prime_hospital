import axios from 'axios';

// 🟢 Dynamically Pick Base URL based on Environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
export const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;