import axios from 'axios'
import { handleApiError } from '../utilites/index'
import { Employee } from '../types/employee'

interface EmployeeResponse {
  employees: Employee[]
}

const getToken = (): string | null => {
  return localStorage.getItem('authToken')
}

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/employee`
})

apiClient.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// API functions
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await apiClient.get<EmployeeResponse>('')

    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const createEmployee = async (
  employee: Omit<Employee, 'id'>
): Promise<Employee> => {
  try {
    const response = await apiClient.post<Employee>('', employee)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const updateEmployee = async (
  id: number,
  updates: Partial<Omit<Employee, 'id'>>
): Promise<Employee> => {
  try {
    const response = await apiClient.put<Employee>(`/${id}`, updates)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`)
  } catch (error) {
    throw handleApiError(error)
  }
}
