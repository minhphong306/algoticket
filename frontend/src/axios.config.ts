import axios from "axios";
import { AppConfig } from "../app.config";

const api = axios.create({
  baseURL: AppConfig.apiBase,
  headers: {
    "Content-Type": ["application/json"],
  },
});

// request interceptor to add token to request headers
api.interceptors.request.use(
  async (config) => {
    // Implement function to get token

    // const token = {
    //   accessToken: "my-access-token",
    //   refreshToken: "my-refresh-token",
    // };

    // if (token?.accessToken) {
    //   config.headers.Authorization = `Bearer ${token?.accessToken}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Implement logic here

    return Promise.reject(error);
  }
);

export default api;
