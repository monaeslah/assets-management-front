import React, { useState, useEffect } from "react";
import InputWrapper from "./wrappedinput";
import { useEmployees } from "../context/employeesContext";
import { AssetFormProps } from "../types/asset";
const AssetForm: React.FC<AssetFormProps> = ({
  isOpen,
  initialData,
  onSave,
  onClose,
}) => {
  const { employees } = useEmployees();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serialNumber: "",
    status: "AVAILABLE",
    assignto: "No body yet",
    // assigntoId: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    type: "",
    serialNumber: "",
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        serialNumber: initialData.serialNumber,
        status: initialData.status,
        assignto: initialData.assignedUser || "No body yet",
        // assigntoId: initialData.assignedUserId,
      });
    }
  }, [initialData]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "assignto") {
      const selectedEmployee = employees.find((emp) => emp.name === value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        assignto: selectedEmployee ? selectedEmployee.id : null,
        // assigntoId: selectedEmployee ? selectedEmployee.id : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

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
    console.log(employees);
    onSave({ ...formData, assigntoId: formData.assigntoId });
    setFormData({
      name: "",
      type: "",
      serialNumber: "",
      status: "AVAILABLE",
      assignto: "No body yet",
      assigntoId: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>{initialData ? "Edit Asset" : "Add New Asset"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
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
              className="input"
            />
          </InputWrapper>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="input-wrapper">
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
              className="input"
            />
          </InputWrapper>
          {errors.type && <p className="error">{errors.type}</p>}
        </div>

        <div className="input-wrapper">
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
              className={`input ${initialData ? "input-disabled" : ""}`}
            />
          </InputWrapper>
          {errors.serialNumber && (
            <p className="error">{errors.serialNumber}</p>
          )}
        </div>

        <div className="input-wrapper">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select"
          >
            <option value="AVAILABLE">Available</option>
            <option value="CHECKED_OUT">Checked Out</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label htmlFor="status">Owner</label>
          <select
            id="owner"
            name="owner"
            value={formData.assignto}
            onChange={handleChange}
            className="select"
          >
            <option value="">No body yet</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="button primary">
            {initialData ? "Update" : "Save"}
          </button>
          <button type="button" onClick={onClose} className="button secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetForm;
