import React, { createContext, useState, useContext } from "react";

interface Asset {
  id: number;
  name: string;
  type: string;
  serialNumber: string;
  status: string;
}

interface AssetContextType {
  assets: Asset[];
  fetchAssets: () => void;
}
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAssets, addAsset, editAsset, deleteAsset } from "../services/api";

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAssets() {
      setLoading(true);
      const data = await fetchAssets();
      setAssets(data);
      setLoading(false);
    }
    getAssets();
  }, []);

  const addNewAsset = async (asset) => {
    const newAsset = await addAsset(asset);
    setAssets([...assets, newAsset]);
  };

  const editAssetDetails = async (id, updates) => {
    const updatedAsset = await editAsset(id, updates);
    setAssets(assets.map((a) => (a.id === id ? updatedAsset : a)));
  };

  const removeAsset = async (id) => {
    await deleteAsset(id);
    setAssets(assets.filter((a) => a.id !== id));
  };

  return (
    <AssetContext.Provider
      value={{ assets, loading, addNewAsset, editAssetDetails, removeAsset }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetContext = () => useContext(AssetContext);

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const fetchAssets = async () => {
    // Fetch assets from API
    const response = await fetch("/api/assets");
    const data = await response.json();
    setAssets(data);
  };

  return (
    <AssetContext.Provider value={{ assets, fetchAssets }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetProvider");
  }
  return context;
};
