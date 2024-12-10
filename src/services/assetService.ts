import axios from 'axios'
import { handleApiError } from '../utilites/index'
import { Asset } from '../types/asset'

const getToken = (): string | null => {
  return localStorage.getItem('authToken')
}

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/assets`
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
export const fetchAssetsAPI = async (): Promise<Asset[]> => {
  try {
    const response = await apiClient.get<Asset[]>('')
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const addAssetAPI = async (asset: Omit<Asset, 'id'>): Promise<Asset> => {
  try {
    const response = await apiClient.post<Asset>('', asset)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const editAssetAPI = async (
  id: number,
  updates: Partial<Omit<Asset, 'id'>>
): Promise<Asset> => {
  try {
    const response = await apiClient.put<Asset>(`/${id}`, updates)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export const deleteAssetAPI = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`)
  } catch (error) {
    throw handleApiError(error)
  }
}
