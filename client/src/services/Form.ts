import { axios } from "./index";
import { Response, Form, formUrl, responseUrl } from "./config";
import {
  FormDetail,
  FormResponse,
  FormData,
  FormResponses,
  PageMeta,
} from "types/Form";

const getFormById = (formId: string) => {
  return axios<{ creatorId: string } & FormDetail>({
    method: "get",
    url: `${formUrl}/${formId}`,
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
  return axios<{
    list: FormData[];
    pageMeta: PageMeta;
  }>({
    method: "get",
    url: Form.getAllForms,
    params,
  });
};

const createForm = (data: { templateId?: string } = {}) => {
  return axios<{
    _id: string;
    title: string;
    updatedAt: string;
    createdAt: string;
  }>({
    method: "post",
    url: Form.createForm,
    data,
  });
};

const deleteFormById = (formId: string) => {
  return axios<{ formId: string; message: string }>({
    method: "delete",
    url: `${formUrl}/${formId}`,
  });
};

const updateFormById = ({
  formId,
  data,
}: {
  formId: string;
  data: FormDetail;
}) => {
  return axios<{ formId: string; message: string }>({
    method: "put",
    url: `${formUrl}/${formId}`,
    data,
  });
};

export const checkResponseStatus = (formId: string) => {
  return axios<{ status: boolean }>({
    method: "get",
    url: `${Response.checkStatus}/${formId}`,
  });
};

export const getFormResponsesById = (formId: string) => {
  return axios<FormResponses>({
    method: "get",
    url: `${responseUrl}/${formId}`,
  });
};

export {
  getFormById,
  sendResponse,
  getAllForms,
  createForm,
  deleteFormById,
  updateFormById,
};
