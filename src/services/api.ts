import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = "TOKEN-TEST-AFINZ";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
