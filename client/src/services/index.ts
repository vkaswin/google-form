import Axios from "axios";
import { cookies } from "helpers";

const cookie = cookies();

export const axios = Axios.create({
  headers: {
    authorization: cookie.get("auth_token"),
  },
});

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
