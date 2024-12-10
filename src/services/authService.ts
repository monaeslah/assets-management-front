import axios from 'axios'
import { LoginForm, SignUpForm, User } from '../types/auth'
import { handleApiError } from '../utilites/index'

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const loginAPI = async (
  form: LoginForm
): Promise<{ token: string; user: User }> => {
  try {
    const res = await apiClient.post('/login', form)
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const signUpAPI = async (
  userData: SignUpForm
): Promise<{ authToken: string; user: User }> => {
  try {
    const res = await apiClient.post('/signup', userData)
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}
