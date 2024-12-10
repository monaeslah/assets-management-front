import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, signUpAPI } from "../services/authService";
import { AuthContextType, LoginForm, SignUpForm } from "../types/auth";
import { ApiError } from "../types/error";

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

  const navigate = useNavigate();

  const login = async (form: LoginForm): Promise<void> => {
    try {
      const { token, user } = await loginAPI(form);
      // Handle successful login
      console.log("Logged in user:", user);
      navigate("/dashboard");
    } catch (error) {
      const apiError = error as ApiError;
      setFeedback(apiError.message);
    }
  };

  const signUp = async (form: SignUpForm): Promise<void> => {
    try {
      await signUpAPI(form);

      navigate("/login");
    } catch (error) {
      const apiError = error as ApiError;
      setFeedback(apiError.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, signUp, feedback, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};
