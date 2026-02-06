
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  // Get JWT token from localStorage
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response?.status === 401) {
        // Clear authentication data
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        localStorage.setItem("TOKEN_EXPIRE", "Your login has expired. Please log in again to continue.");
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error(error);
    }

    throw error;
  }
);

export default axiosClient;
