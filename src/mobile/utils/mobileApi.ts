/* eslint-disable @typescript-eslint/no-explicit-any */
// Mobile API utility functions
// This ensures all mobile API calls use absolute URLs to connect to the backend server

import { BASE_URL } from "../../constant";

// Auto-detect environment: use localhost for web browser, IP address for mobile
// const isMobileDevice = () => {
//   return (
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//       navigator.userAgent
//     ) || (window as any).Capacitor?.isNative
//   );
// };

// const MOBILE_API_BASE_URL = isMobileDevice()
// ? "http://10.150.134.129:3000" // Use localhost for development
// : "http://localhost:5000"; // Use localhost for development
// const MOBILE_API_BASE_URL = BASE_URL;
// Global fetch interceptor to catch ALL API calls
const originalFetch = window.fetch;
window.fetch = function (...args) {
  return originalFetch.apply(this, args);
};

export const mobileApiCall = async (
  method: string,
  endpoint: string,
  data?: any
) => {
  // Handle different endpoint types
  let mobileEndpoint: string;
  if (endpoint.startsWith(`${BASE_URL}/api/mobile`)) {
    // Already a mobile endpoint
    mobileEndpoint = endpoint;
  } else if (endpoint.startsWith(`${BASE_URL}/api/reports`)) {
    // Reports endpoints go directly to /api/reports
    mobileEndpoint = endpoint;
  } else {
    // Other endpoints get /api/mobile prefix
    mobileEndpoint = `${BASE_URL}/api/mobile${endpoint}`;
  }
  const fullUrl = `${mobileEndpoint}`;

  console.log("🌐 Mobile API Call:", { method, fullUrl, endpoint });

  // Get stored mobile session ID for mobile app
  const mobileSessionId = localStorage.getItem("mobileSessionId");

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(mobileSessionId && { "x-mobile-session-id": mobileSessionId }),
    },
    credentials: "include",
    cache: "no-store",
    mode: "cors", // Explicitly set CORS mode
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fullUrl, options);

    // Log response for debugging
    console.log("📡 API Response:", {
      status: response.status,
      statusText: response.statusText,
      url: fullUrl,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
        url: fullUrl,
      });
    }

    // Extract and store mobile session ID from response
    if (
      response.ok &&
      method === "POST" &&
      (endpoint === "/login" ||
        endpoint === `${BASE_URL}/api/mobile/login` ||
        endpoint === "/register" ||
        endpoint === `${BASE_URL}/api/mobile/register`)
    ) {
      try {
        const responseData = await response.clone().json();

        if (responseData.mobileSessionId) {
          localStorage.setItem("mobileSessionId", responseData.mobileSessionId);
          console.log(
            "✅ Mobile session ID stored from",
            endpoint,
            ":",
            responseData.mobileSessionId
          );
        }
      } catch (e) {
        console.error("Could not parse response for session ID:", e);
      }
    }

    return response;
  } catch (error) {
    console.log(error);
    console.error("💥 Fetch Error:", {
      error,
      message: error instanceof Error ? error.message : String(error),
      url: fullUrl,
      method,
    });
    throw error;
  }
};

// Convenience functions for common HTTP methods
export const mobileGet = (endpoint: string) => mobileApiCall("GET", endpoint);
export const mobilePost = (endpoint: string, data?: any) =>
  mobileApiCall("POST", endpoint, data);
export const mobilePut = (endpoint: string, data?: any) =>
  mobileApiCall("PUT", endpoint, data);
export const mobileDelete = (endpoint: string) =>
  mobileApiCall("DELETE", endpoint);
export const mobilePatch = (endpoint: string, data?: any) =>
  mobileApiCall("PATCH", endpoint, data);
