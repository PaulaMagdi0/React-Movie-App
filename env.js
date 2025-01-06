import axios from "axios";
const API_BASE_URL='https://api.themoviedb.org/3/movie/popular?api_key={API}';
import.meta.env.VITE_API_BASE_URL;
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});