import axios from 'axios';

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${apiBase}/api`,
  withCredentials: true,
});

export default api;
