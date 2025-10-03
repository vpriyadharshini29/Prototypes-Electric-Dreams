import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ https://prototypes-electric-dreams.onrender.com/api/
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API Base URL:", import.meta.env.VITE_API_URL); // ✅ Debugging

export default api;