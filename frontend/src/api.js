import axios from "axios";

// ✅ Make sure the base URL matches exactly what you set in Vercel
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://prototypes-electric-dreams.onrender.com/api/',
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullURL: error.config?.baseURL + error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

console.log("API Base URL:", import.meta.env.VITE_API_URL);

export default api;