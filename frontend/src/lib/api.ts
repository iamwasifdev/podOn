import axios from "axios";

// 1. Create the instance
const api = axios.create({
  // Use the URL from your .env file, or fallback to localhost
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
});

// 2. The "Authorization" Interceptor
// This runs before every single request your app makes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    // If we have a token, add it to the Headers
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
