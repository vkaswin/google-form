import { axios } from "./index";

const getFormDetails = () => {
  return axios({ method: "get", url: "/form" });
};
