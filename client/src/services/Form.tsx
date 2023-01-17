import { AxiosPromise } from "axios";
import { FormDetail } from "types/Form";
import { axios } from "./index";

export const getFormById = (formId: string) => {
  return axios({
    method: "get",
    url: `http://localhost:8000/api/form/${formId}`,
  }) as AxiosPromise<FormDetail>;
};
