import axios from 'axios'
import { ApiError } from '../types/error'
export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error.response?.data

    return {
      message: axiosError?.message || 'An unknown error occurred',
      status: error.response?.status,
      errors: axiosError?.errors || []
    }
  }

  return {
    message: 'An unexpected error occurred'
  }
}
