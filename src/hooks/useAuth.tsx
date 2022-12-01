import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "types/User";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  let [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // getUser();
  }, []);

  const getUser = (): void => {
    console.log(user); //
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {user ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
