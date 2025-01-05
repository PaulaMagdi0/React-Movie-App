import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key=a8076e672805353996a77d9c2e8db7ee",
});