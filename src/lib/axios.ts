import axios from "axios";
import { BASE_URL } from "../constant";

// Example helpers – adapt to your auth storage logic
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const getMobileSessionId = ()=> localStorage.getItem("mobileSessionId") || "" ;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important if cookies/session are used
});

// 🔹 Request interceptor: attach tokens
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const mobileSessionId = getMobileSessionId()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }
    if (mobileSessionId) {
      config.headers["x-refresh-token"] = refreshToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
