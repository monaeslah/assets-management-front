import React, { useState } from "react";

interface AssetFormProps {
  initialData?: {
    name: string;
    type: string;
    serialNumber: string;
    status: string;
  };
  onSave: (data: {
    name: string;
    type: string;
    serialNumber: string;
    status: string;
  }) => void;
  onCancel?: () => void;
}

const AssetForm: React.FC<AssetFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    serialNumber: initialData?.serialNumber || "",
    status: initialData?.status || "AVAILABLE",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!formData.name || !formData.type || !formData.serialNumber) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSave(formData);
  };

  return (
    <div>
      <h2>{initialData ? "Edit Asset" : "Add New Asset"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Asset Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Asset Type</label>
          <input
            id="type"
            name="type"
            type="text"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="serialNumber">Serial Number</label>
          <input
            id="serialNumber"
            name="serialNumber"
            type="text"
            value={formData.serialNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="AVAILABLE">Available</option>
            <option value="CHECKED_OUT">Checked Out</option>
          </select>
        </div>
        <div>
          <button type="submit">Save</button>
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
