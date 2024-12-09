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
