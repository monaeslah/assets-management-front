import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, signUpAPI } from "../services/authService";
import { AuthContextType, LoginForm, User, SignUpForm } from "../types/auth";
import { ApiError } from "../types/error";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [feedback, setFeedback] = useState<string>("");
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("authToken") || null
  );
  const [welcom, setWelcom] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (token && storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [token]);
  const login = async (form: LoginForm): Promise<void> => {
    try {
      const { token, user } = await loginAPI(form);
      setUserInfo(user);
      setToken(token);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      const apiError = error as ApiError;
      setFeedback(apiError.message);
    }
  };

  const signUp = async (form: SignUpForm): Promise<void> => {
    try {
      const { token, user } = await signUpAPI(form);
      localStorage.setItem("authToken", token);
      localStorage.setItem("userInfo", JSON.stringify(user));
      setWelcom(user);
      setToken(token);
      console.log("Stored Token: ", token);
      navigate("/welcome");
    } catch (error) {
      const apiError = error as ApiError;
      setFeedback(apiError.message);
    }
  };
  const logout = () => {
    setToken(null);
    setUserInfo(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ login, signUp, logout, feedback, userInfo, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
