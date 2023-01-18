import { Dispatch, SetStateAction } from "react";

export type User = {};

export type AuthContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
};
