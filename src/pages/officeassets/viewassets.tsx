import React, { useEffect, useState } from "react";
import { useAssets } from "../../context/assetsContext";
import Table from "../../components/table";
import AssetForm from "../../components/assetform";
import ConfirmModal from "../../components/confirmmodal";
import { Asset } from "../../types/asset";
const AssetPage: React.FC = () => {
  const {
    assets,
    loading,
    error,
    fetchAssets,
    addAsset,
    editAsset,
    deleteAsset,
  } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<number | null>(null);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  if (loading) return <p>Loading assets...</p>;
  if (error) return <p>{error}</p>;

  const handleAdd = (asset: Omit<Asset, "id">) => {
    addAsset(asset);
  };

  const handleEdit = (id: number, updates: Partial<Asset>) => {
    editAsset(id, updates);
  };

  const handleDelete = () => {
    if (currentAsset) {
      deleteAsset(currentAsset);
      setIsModalOpen(false);
      setCurrentAsset(null);
    }
  };

  return (
    <div>
      <h1>Assets</h1>
      <Table
        data={assets}
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Type", accessor: "type" },
          { header: "Serial Number", accessor: "serialNumber" },
          { header: "Status", accessor: "status" },
        ]}
        onEdit={(id) => setCurrentAsset(id)}
        onDelete={(id) => {
          setCurrentAsset(id);
          setIsModalOpen(true);
        }}
      />
      <AssetForm onSave={handleAdd} />
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AssetPage;
