import { FormDetail, FormResponse } from "types/Form";
import { axios } from "./index";

export const getFormById = (formId: string) => {
  return axios<FormDetail>({
    method: "get",
    url: `http://localhost:8000/api/form/${formId}`,
  });
};

export const sendResponse = (data: FormResponse) => {
  return axios({
    method: "post",
    url: `http://localhost:8000/api/response/submit`,
    data,
  });
};
