import React, { useEffect, useState } from "react";
import { useAssets } from "../../context/assetContext";
import Table from "../../components/table";
import AssetForm from "../../components/assetform";
import ConfirmModal from "../../components/confirmmodal";
import { Asset } from "../../types/asset";

import AssetButton from "../../components/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AssetPage: React.FC = () => {
  const {
    assets,

    error,
    fetchAssets,
    addAsset,
    editAsset,
    deleteAsset,
  } = useAssets();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const [assetToDelete, setAssetToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleAdd = async (asset: Omit<Asset, "id">) => {
    try {
      await addAsset(asset);
      toast.success("Asset has been added successfully!");
    } catch (error) {
      toast.error("Failed to add the asset. Please try again.");
    } finally {
      setIsAddModalOpen(false);
    }
  };

  const handleEdit = async (updates: Partial<Asset>) => {
    if (assetToEdit) {
      try {
        await editAsset(assetToEdit.id, updates);
        fetchAssets();
        toast.success("Asset has been updated successfully!");
      } catch (error) {
        toast.error("Failed to update the asset. Please try again.");
      } finally {
        setAssetToEdit(null);
        setIsAddModalOpen(false);
      }
    }
  };
  const handleDelete = async () => {
    if (assetToDelete !== null) {
      await deleteAsset(assetToDelete);
      setIsDeleteModalOpen(false);
      toast.success("Asset has been deleted successfully!");
    }
  };

  return (
    <div>
      <div id="header">
        {" "}
        <h1>Assets</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <AssetButton
          label={"Add Asset"}
          enable={true}
          size="small"
          className={"primary-btn margin-top"}
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <Table
        data={assets}
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Type", accessor: "type" },
          { header: "Serial Number", accessor: "serialNumber" },
          {
            header: "Owner",
            accessor: "assignedUser",
            render: (value) => (value === null ? "no body" : value),
          },
          { header: "Status", accessor: "status" },
        ]}
        onEdit={(id) => {
          const asset = assets.find((a) => a.id === id);
          if (asset) {
            setAssetToEdit(asset);
            setIsAddModalOpen(true);
          }
        }}
        onDelete={(id) => {
          setAssetToDelete(id);
          setIsDeleteModalOpen(true);
        }}
      />
      <AssetForm
        isOpen={isAddModalOpen}
        onClose={() => {
          setAssetToEdit(null);
          setIsAddModalOpen(false);
        }}
        onSave={assetToEdit ? handleEdit : handleAdd}
        initialData={assetToEdit || null}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        message="Are you sure you want to delete this asset?"
      />
      <ToastContainer />
    </div>
  );
};

export default AssetPage;
