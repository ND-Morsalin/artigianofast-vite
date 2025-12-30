import axios from "axios";
import { BASE_URL } from "../constant";

// Example helpers – adapt to your auth storage logic
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const getMobileSessionId = ()=> localStorage.getItem("mobileSessionId") || "" ;
const getMobileDataToken = ()=> localStorage.getItem("mobile_data_token");
const getAdminAccessToken = ()=> localStorage.getItem("admin_access_token");

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important if cookies/session are used
});

// 🔹 Request interceptor: attach tokens
axiosInstance.interceptors.request.use(
  (config) => {
    // Skip adding auth-related headers for login routes to avoid unnecessary CORS preflight issues
    if (config.url?.includes('/login')) {
      return config;
    }

    const accessToken = getAccessToken();
    const mobileSessionId = getMobileSessionId();
    const refreshToken = getRefreshToken();
    const mobileDataToken = getMobileDataToken();
    const adminAccessToken = getAdminAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }
    if (mobileSessionId) {
      config.headers["x-mobile-session-id"] = mobileSessionId;
    }
    if (mobileDataToken) {
      config.headers["x-mobile_data_token"] = mobileDataToken;
    }
    if (adminAccessToken) {
      config.headers["x-admin_access_token"] = adminAccessToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);