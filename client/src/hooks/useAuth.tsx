import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext as AuthContextType, User } from "types/Auth";
import { cookies } from "helpers";
import jwtDecode from "jwt-decode";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let [user, setUser] = useState<User | null>(null);
  let [loading, setLoading] = useState(true);
  let cookie = cookies();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = (): void => {
    let token = cookie.get("auth_token");
    if (token) {
      let decoded = jwtDecode<User>(token);
      setUser(decoded);
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {loading ? (
        <div>
          <span>Loading</span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
