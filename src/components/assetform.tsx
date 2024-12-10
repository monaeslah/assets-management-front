import React, { useState, useEffect } from "react";
import InputWrapper from "./wrappedinput";
const AssetForm: React.FC<AssetFormProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serialNumber: "",
    status: "AVAILABLE",
  });

  const [errors, setErrors] = useState({
    name: "",
    type: "",
    serialNumber: "",
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        type: initialData.type || "",
        serialNumber: initialData.serialNumber || "",
        status: initialData.status || "AVAILABLE",
      });
    }
  }, [initialData]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = { name: "", type: "", serialNumber: "" };

    if (!formData.name) newErrors.name = "Asset name is required.";
    if (!formData.type) newErrors.type = "Asset type is required.";
    if (!initialData && !formData.serialNumber)
      newErrors.serialNumber = "Serial number is required.";

    setErrors(newErrors);

    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
      }}
    >
      <h2>{initialData ? "Edit Asset" : "Add New Asset"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <InputWrapper
            label="Name"
            error={formData.name === "" ? "Name is required" : undefined}
          >
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "90%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </InputWrapper>

          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <InputWrapper
            label="Type"
            error={formData.type === "" ? "Type is required" : undefined}
          >
            <input
              id="type"
              name="type"
              type="text"
              value={formData.type}
              onChange={handleChange}
              style={{
                width: "90%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </InputWrapper>

          {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
        </div>
        <div>
          <InputWrapper
            label="Serial Number"
            error={
              formData.serialNumber === ""
                ? "Serial number is required"
                : undefined
            }
          >
            <input
              id="serialNumber"
              name="serialNumber"
              type="text"
              value={formData.serialNumber}
              onChange={handleChange}
              disabled={!!initialData}
              style={{
                width: "90%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: initialData ? "#f0f0f0" : "white",
                color: "red",
              }}
            />
          </InputWrapper>

          {errors.serialNumber && (
            <p style={{ color: "red" }}>{errors.serialNumber}</p>
          )}
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
        <div style={{ marginTop: "1rem" }}>
          <button type="submit">{initialData ? "Update" : "Save"}</button>
          <button
            type="button"
            onClick={onClose}
            style={{ marginLeft: "1rem" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
