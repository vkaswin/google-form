import { axios } from "./index";
import { Response, Form } from "./config";
import { FormDetail, FormResponse, FormData } from "types/Form";

const getFormById = (formId: string) => {
  return axios<FormDetail>({
    method: "get",
    url: `${Form.getFormById}/${formId}`,
  });
};

const sendResponse = (data: FormResponse) => {
  return axios({
    method: "post",
    url: Response.submitResponse,
    data,
  });
};

const getAllForms = (params?: any) => {
  return axios<FormData[]>({
    method: "get",
    url: Form.getAllForms,
    params,
  });
};

export { getFormById, sendResponse, getAllForms };
