import React, { useEffect, useState } from "react";
import { Employee } from "../types/employee";
import { Department } from "../types/department";
import { toast } from "react-toastify";
import InputField from "./Input";

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

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>{initialData ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}

        <InputField className="inputField mediumInput" label="Name">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputField>

        {/* Role Input */}
        <div className="form-group">
          <InputField className="inputField mediumInput" label="Role">
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </InputField>
        </div>

        {/* Status Dropdown */}

        {/* Department Dropdown */}
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={formData.department}
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
        <div className="form-actions">
          <button type="submit">
            {initialData ? "Save Changes" : "Add Employee"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
