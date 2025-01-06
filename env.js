import axios from "axios";
const API_BASE_URL='https://api.themoviedb.org/3/movie/popular?api_key=a8076e672805353996a77d9c2e8db7ee';
import.meta.env.VITE_API_BASE_URL;
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});