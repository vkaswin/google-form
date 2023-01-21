import { axios } from "./index";
import { User } from "./config";

const loginUser = (data: { email: string; password: string }) => {
  return axios<{ token: string }>({ method: "post", url: User.login, data });
};

const registerUser = (data: {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}) => {
  return axios<{ token: string }>({
    method: "post",
    url: User.register,
    data,
  });
};

export { loginUser, registerUser };
