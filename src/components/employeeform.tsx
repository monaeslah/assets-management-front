import React, { useEffect, useState } from "react";
import { Employee } from "../types/employee";
import { Department } from "../types/department";
import { toast } from "react-toastify";
import InputField from "./Input";
import InputWrapper from "./wrappedinput";
import AssetButton from "./button";

interface EmployeeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Employee, "id"> | Partial<Employee>) => Promise<void>;
  initialData?: Employee | null;
  departments: Department[];
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  departments,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
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
        role: initialData.role,
        department: initialData.department?.id,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.department) {
      toast.error("Please select a department.");
      return;
    }

    const payload = {
      ...formData,
      departmentId: parseInt(formData.department, 10),
    };
    console.log(payload);
    await onSave(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>{initialData ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <InputWrapper
            label="Name"
            error={formData.name === "" ? "Name is required" : undefined}
          >
            {" "}
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              disabled={!!initialData}
              className={`input ${initialData ? "input-disabled" : ""}`}
            />
          </InputWrapper>
        </div>

        {/* Role Input */}
        <div className="form-group">
          <label htmlFor="status">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="select"
          >
            <option value="EMPLOYEE">Employee</option>
            <option value="HR_MANAGER">HR</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select a Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="button-group">
          <AssetButton
            label={initialData ? "Save Changes" : "Add Employee"}
            enable={true}
            size="small"
            className={"m-auto primary-btn"}
            onClick={handleSubmit}
          />

          <button type="button" onClick={onClose} className="button secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
