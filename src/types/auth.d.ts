// src/types/auth.d.ts

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (form: LoginForm) => Promise<{ success: boolean; message: string }>
  logout: () => void
  signUp: (userData: SignUpForm) => Promise<SignUpResponse>
  feedBackLogin: string
  feedBackSignUp: string
}

export interface User {
  id: number
  email: string
  role: 'HR_MANAGER' | 'EMPLOYEE'
}

export interface LoginForm {
  email: string
  password: string
}

export interface SignUpForm {
  email: string
  password: string
  role?: 'HR_MANAGER' | 'EMPLOYEE' // Optional, default is EMPLOYEE
}

export interface SignUpResponse {
  success: boolean
  message: string
}
