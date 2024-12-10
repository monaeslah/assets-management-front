import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/assets`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Asset and ApiError interfaces
interface Asset {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  status: string;
}

interface ApiError {
  message: string;
  status?: number;
  errors?: Array<{ field: string; message: string }>;
}

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error.response?.data;

    return {
      message: axiosError?.message || "An unknown error occurred",
      status: error.response?.status,
      errors: axiosError?.errors || [],
    };
  }

  return {
    message: "An unexpected error occurred",
  };
};

export const fetchAssets = async (): Promise<Asset[]> => {
  try {
    const response = await apiClient.get<Asset[]>("/");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addAsset = async (asset: Omit<Asset, "id">): Promise<Asset> => {
  try {
    const response = await apiClient.post<Asset>("/", asset);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const editAsset = async (
  id: number,
  updates: Partial<Omit<Asset, "id">>
): Promise<Asset> => {
  try {
    const response = await apiClient.put<Asset>(`/${id}`, updates);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteAsset = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};
