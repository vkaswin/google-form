import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext as AuthContextType, User } from "types/Auth";
import { cookies } from "helpers";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let [user, setUser] = useState<User | null>(null);
  let cookie = cookies();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = (): void => {
    return;
    let token = cookie.get("auth_token");

    if (!token && !window.location.hash.includes("/auth/login")) {
      let url = window.encodeURIComponent(window.location.hash.substring(1));
      window.location.hash = `#/auth/login?url=${url}`;
      return;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
