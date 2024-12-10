import React, { createContext, useState, ReactNode } from "react";
import {
  fetchAssetsAPI,
  addAssetAPI,
  editAssetAPI,
  deleteAssetAPI,
} from "../services/assetService";
import { Asset } from "../types/asset";
import { handleApiError } from "../utilites/index";
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
    } catch (error) {
      setError("Failed to update asset");
      throw handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const addAsset = async (asset: Omit<Asset, "id">) => {
    try {
      const newAsset = await addAssetAPI(asset);
      setAssets((prev) => [...prev, newAsset]);
    } catch (error) {
      throw handleApiError(error);
    }
  };

  const editAsset = async (id: number, updates: Partial<Asset>) => {
    try {
      const updatedAsset = await editAssetAPI(id, updates);
      setAssets((prev) =>
        prev.map((asset) => (asset.id === id ? updatedAsset : asset))
      );
    } catch (error) {
      throw handleApiError(error);
    }
  };

  const deleteAsset = async (id: number) => {
    try {
      await deleteAssetAPI(id);
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    } catch (error) {
      throw handleApiError(error);
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
export const useAssets = () => {
  const context = React.useContext(AssetContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetProvider");
  }
  return context;
};
