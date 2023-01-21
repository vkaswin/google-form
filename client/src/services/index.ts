import Axios from "axios";
import { cookie } from "utils";

export const axios = Axios.create({});

axios.interceptors.request.use(
  (config) => {
    let token = cookie.get("auth_token");
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers["authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      document.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return Promise.reject(error?.response?.data);
  }
);
