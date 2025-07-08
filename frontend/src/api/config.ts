// api/config.js
import axios, { AxiosRequestConfig } from "axios";

// Create axios instance with base URL from environment
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000", // Default to localhost if not set
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// // Request interceptor (optional - for auth tokens, etc.)
// api.interceptors.request.use(
//     (config) => {
//         // Add auth token if available
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor (optional - for error handling)
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response?.status === 401) {
//             // Handle unauthorized access
//             localStorage.removeItem("token");
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

export default api;

// Alternative: Export specific methods if you prefer
export const get = (url: string, config: AxiosRequestConfig<any> | undefined) =>
    api.get(url, config);
export const post = (
    url: string,
    data: any,
    config: AxiosRequestConfig<any> | undefined
) => api.post(url, data, config);
export const put = (
    url: string,
    data: any,
    config: AxiosRequestConfig<any> | undefined
) => api.put(url, data, config);
export const del = (url: string, config: AxiosRequestConfig<any> | undefined) =>
    api.delete(url, config);
