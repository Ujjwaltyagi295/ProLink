
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";
import { useAuthStore } from "@/store/useAuthStore";


const options = {
  baseURL: `${import.meta.env.VITE_API_URI}/api`,
  withCredentials: true,
};
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((res) => res.data);

const API = axios.create(options);

let isRefreshing = false;
let requestQueue: ((token: string | null) => void)[] = [];

const waitForTokenRefresh = (): Promise<string | null> => {
  return new Promise((resolve) => {
    requestQueue.push(resolve);
  });
};

const resolveQueue = (token: string | null) => {
  requestQueue.forEach((cb) => cb(token));
  requestQueue = [];
};

API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    const { status, data } = error.response || {};
 
    const { clearAuth, setAuth } = useAuthStore.getState();
    const isAuthError =status === 401 && data?.errorCode === "InvalidAccessToken";

    if (!isAuthError) {
      return Promise.reject(error);
    }

    // If a refresh is already in progress
    if (isRefreshing) {
      await waitForTokenRefresh();
      return API(originalRequest);
    }

    // First to catch the error: start refresh
    isRefreshing = true;

    try {
      await TokenRefreshClient.get("/auth/refresh");

      // Mark refresh done & retry queued requests
      isRefreshing = false;
      resolveQueue(null);
      setAuth(true)
      return API(originalRequest);
      
    } catch (refreshError) {
      isRefreshing = false;
      resolveQueue(null); // let others continue/fail gracefully
      clearAuth()
      queryClient.clear();
      navigate("/login", {
        state: {
          redirectUrl: window.location.pathname,
        },
      });

      return Promise.reject(refreshError);
    }
  }
);

export default API;
