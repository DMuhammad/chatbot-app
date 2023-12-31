import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/api-communicator";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();

      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }
    }

    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ name: data.name, email: data.email });
      setIsLoggedIn(true);
    }
  };
  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);

    if (data) {
      setUser(null);
      setIsLoggedIn(false);
      window.location.href = "/login";
    }
  };
  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

const UseAuth = () => useContext(AuthContext);

export { AuthProvider, UseAuth };
