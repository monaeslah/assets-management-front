// src/types/pages.d.ts

export interface LoginForm {
  email: string
  password: string
}

export interface InputFieldProps {
  iconBefore?: string
  className?: string
  children: React.ReactNode
}

export interface DreamButtonProps {
  label: string
  enable: boolean
  size: 'small' | 'medium' | 'large'
  className?: string
  onClick: () => void
}

export interface SignUpForm {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export interface SignUpPageProps {
  feedBackSignUp: string // Feedback message for signup errors
  signUp: (userData: SignUpForm) => Promise<void> // Function to handle signup
}
