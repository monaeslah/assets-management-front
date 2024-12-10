import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

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

// Axios client configuration
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/assets`,
  headers: {
    "Content-Type": "application/json",
  },
});

// API service functions
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

const fetchAssetsAPI = async (): Promise<Asset[]> => {
  try {
    const response = await apiClient.get<Asset[]>("/");
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const addAssetAPI = async (asset: Omit<Asset, "id">): Promise<Asset> => {
  try {
    const response = await apiClient.post<Asset>("/", asset);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const editAssetAPI = async (
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

const deleteAssetAPI = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

// Context and provider
interface AssetContextType {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  fetchAssets: () => Promise<void>;
  addAsset: (asset: Omit<Asset, "id">) => Promise<void>;
  editAsset: (id: number, updates: Partial<Asset>) => Promise<void>;
  deleteAsset: (id: number) => Promise<void>;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const data = await fetchAssetsAPI();
      setAssets(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch assets");
    } finally {
      setLoading(false);
    }
  };

  const addAsset = async (asset: Omit<Asset, "id">) => {
    try {
      const newAsset = await addAssetAPI(asset);
      setAssets((prev) => [...prev, newAsset]);
    } catch (err) {
      setError("Failed to add asset");
    }
  };

  const editAsset = async (id: number, updates: Partial<Asset>) => {
    try {
      const updatedAsset = await editAssetAPI(id, updates);
      setAssets((prev) =>
        prev.map((asset) => (asset.id === id ? updatedAsset : asset))
      );
    } catch (err) {
      setError("Failed to update asset");
    }
  };

  const deleteAsset = async (id: number) => {
    try {
      await deleteAssetAPI(id);
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    } catch (err) {
      setError("Failed to delete asset");
    }
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        loading,
        error,
        fetchAssets,
        addAsset,
        editAsset,
        deleteAsset,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetContext = (): AssetContextType => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAssetContext must be used within an AssetProvider");
  }
  return context;
};
