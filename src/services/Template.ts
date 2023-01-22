import { axios } from "./index";
import { Template } from "./config";
import { FormData } from "types/Form";

const getAllTemplates = (params?: {}) => {
  return axios<FormData[]>({
    method: "get",
    url: Template.getAllTemplate,
    params,
  });
};

export { getAllTemplates };
