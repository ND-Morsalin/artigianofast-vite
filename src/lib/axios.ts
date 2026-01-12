import axios from "axios";
import { BASE_URL } from "../constant";
import { Storage } from "./storage";

// Example helpers – adapt to your auth storage logic

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important if cookies/session are used
});

// 🔹 Request interceptor: attach tokens
axiosInstance.interceptors.request.use(
  async (config) => {
    // Skip adding auth-related headers for login routes to avoid unnecessary CORS preflight issues
    if (config.url?.includes("/login")) {
      return config;
    }

    const accessToken = await Storage.get("accessToken");
    const refreshToken = await Storage.get("refreshToken");
    const mobileSessionId = await Storage.get("mobileSessionId");
    const mobileDataToken = await Storage.get("mobile_data_token");
    const adminAccessToken = await Storage.get("admin_access_token");
    const platform = await Storage.get("platform");

    if (platform) {
      config.headers["x-platform"] = platform;
    }

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
      config.headers["x-mobile-data-token"] = mobileDataToken;
    }
    if (adminAccessToken) {
      config.headers["x-admin-access-token"] = adminAccessToken;
    }              

    return config;
  },
  (error) => Promise.reject(error)
);
