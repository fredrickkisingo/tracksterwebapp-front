import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
        "Accept":"application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    },
    timeout: 60 * 1000,
});

export default apiClient;