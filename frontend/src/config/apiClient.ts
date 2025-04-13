import axios from "axios";
import queryClient from "./queryClient";
import { UNAUTHORIZED } from "../constants/http.mjs";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
};


const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch (error) {
        queryClient.clear();
        navigate("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
        if(error){
          return error
        }
      }
    }

    return Promise.reject({ status, ...data });
  }
);

export default API;
