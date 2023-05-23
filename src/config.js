import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:5000/api"
    baseURL: "https://ferreteriaapi-production.up.railway.app/api"
});