const baseURL = "http://localhost:8000";
const userUrl = `${baseURL}/api/user`;
const formUrl = `${baseURL}/api/form`;
const responseUrl = `${baseURL}/api/respose`;

const User = {
  login: `${userUrl}/login`,
  register: `${userUrl}/register`,
};

const Form = {
  getFormById: `${formUrl}`,
};

const Response = {
  submitResponse: `${responseUrl}/submit`,
};

export { User, Form, Response };
