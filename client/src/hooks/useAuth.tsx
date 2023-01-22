import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext as AuthContextType, User } from "types/Auth";
import { cookie } from "utils";
import jwtDecode from "jwt-decode";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let [user, setUser] = useState<User | null>(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.addEventListener("unauthorized", logout);
    getUser();
    return () => document.removeEventListener("unauthorized", logout);
  }, []);

  const getUser = (): void => {
    let token = cookie.get("auth_token");
    if (token) {
      let decoded = jwtDecode<User>(token);
      setUser(decoded);
    }
    setIsLoading(false);
  };

  const logout = () => {
    cookie.remove("auth_token");
    setUser(null);
    window.location.hash = "/auth/login";
  };

  let context = { user, isLoading, setUser, logout };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
