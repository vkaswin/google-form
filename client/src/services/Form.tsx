import { axios } from "./index";

export const getFormDetails = () => {
  return axios({ method: "get", url: "/form" });
};
