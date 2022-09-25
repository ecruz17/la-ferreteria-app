import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://ferreteriaapi-production.up.railway.app/api/"
});