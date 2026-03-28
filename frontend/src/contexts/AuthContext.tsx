import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { storeTokens } from "../utility/Common";

// ✅ User type
type User = {
  id: number;
  name: string;
  email: string;
};



// ✅ Context type
type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (userData: any) => Promise<void>;
  logout: () => void;
};

// ✅ Create context with default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// ✅ Props type
type AuthProviderProps = {
  children: any;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");

    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = async (userData: any) => {
    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };

    setUser(user);
    setIsAuthenticated(true);

    storeTokens(userData.AccessToken);

    localStorage.setItem("userData", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};