import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  // ✅ pulled from .env
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(import.meta.env.VITE_API_URL)

// Attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}token/refresh/`, // ✅ uses env
            { refresh: refreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          localStorage.setItem("access", res.data.access);
          api.defaults.headers.Authorization = `Bearer ${res.data.access}`;
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch (err) {
          console.error("Refresh token expired or invalid", err);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
