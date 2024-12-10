import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  AuthContextType,
  User,
  LoginForm,
  SignUpForm,
  SignUpResponse,
} from "../types/auth";

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
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken") || null
  );
  const [feedBackLogin, setFeedBackLogin] = useState<string>("");
  const [feedBackSignUp, setFeedBackSignUp] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [token]);

  const login = async (
    form: LoginForm
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        form
      );

      const authToken = res.data.token;
      const userData: User = res.data.user;
      console.log("Token after login:", res.data);
      setToken(authToken);
      setUser(userData);

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(userData));

      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      console.log("Navigating to dashboard...");
      navigate("/dashboard");

      console.log("Navigation attempted");
      return { success: true, message: "Login successful!" };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        setFeedBackLogin(errorMessage);
        return { success: false, message: errorMessage };
      } else {
        const genericMessage = "An unexpected error occurred.";
        setFeedBackLogin(genericMessage);
        return { success: false, message: genericMessage };
      }
    }
  };

  const signUp = async (userData: SignUpForm): Promise<SignUpResponse> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        userData
      );

      const authToken = res.data.authToken;
      const userDataResponse: User = res.data.user;

      setToken(authToken);
      setUser(userDataResponse);

      localStorage.setItem("authToken", authToken);
      localStorage.setItem("user", JSON.stringify(userDataResponse));

      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      navigate("/dashboard");

      return {
        success: true,
        message: "Sign-up successful! You can now log in.",
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred.";
        setFeedBackSignUp(errorMessage);
        return { success: false, message: errorMessage };
      } else {
        const genericMessage = "An unexpected error occurred.";
        setFeedBackSignUp(genericMessage);
        return { success: false, message: genericMessage };
      }
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        signUp,
        feedBackLogin,
        feedBackSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
