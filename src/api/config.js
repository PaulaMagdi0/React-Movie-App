import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY, // Add API key to all requests
  },
});