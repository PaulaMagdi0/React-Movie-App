import axios from "axios";
export const axiosInstance = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key={UR_API}",
});