export const baseURL = "https://google-form-server.vercel.app";
const userUrl = `${baseURL}/api/user`;
const formUrl = `${baseURL}/api/form`;
const responseUrl = `${baseURL}/api/response`;
const templateUrl = `${baseURL}/api/template`;

const User = {
  login: `${userUrl}/login`,
  register: `${userUrl}/register`,
};

const Form = {
  getAllForms: `${formUrl}/all`,
  createForm: `${formUrl}/create`,
};

const Response = {
  submitResponse: `${responseUrl}/submit`,
  checkStatus: `${responseUrl}/status`,
};

const Template = {
  getAllTemplate: `${templateUrl}/all`,
};

export { User, Form, Response, Template, formUrl };
