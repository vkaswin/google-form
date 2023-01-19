import { Dispatch, SetStateAction } from "react";

export type User = {
  readonly _id: string;
  email: string;
  name: string;
};

export type AuthContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
};
