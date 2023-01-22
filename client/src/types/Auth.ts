import { Dispatch, SetStateAction } from "react";

export type User = {
  readonly _id: string;
  email: string;
  name: string;
};

export type AuthContext = {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: Login;
  register: Register;
  logout: () => void;
};

export type Login = (data: { email: string; password: string }) => void;

export type Register = (data: {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}) => void;
