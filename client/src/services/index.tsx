import Axios from "axios";

export const axios = Axios.create();

axios.interceptors.request.use(
  (config) => {
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
