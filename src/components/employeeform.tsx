import React, { useEffect, useState } from "react";
import { Employee } from "../types/employee";
import { Department } from "../types/department";
import { toast } from "react-toastify";

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
  const [name, setName] = useState(initialData?.name || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [status, setStatus] = useState(initialData?.status || "Active");
  const [departmentId, setDepartmentId] = useState<number | undefined>(
    initialData?.department?.id
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentId) {
      toast.error("Please select a department.");
      return;
    }

    try {
      await onSave({
        name,
        role,
        status,
        departmentId,
      });
      toast.success(
        initialData
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );
      onClose();
    } catch (error) {
      toast.error("An error occurred while saving the employee.");
    }
  };

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRole(initialData.role);
      setStatus(initialData.status);
      setDepartmentId(initialData.department?.id);
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{initialData ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Role Input */}
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          {/* Status Dropdown */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={departmentId}
              onChange={(e) => setDepartmentId(Number(e.target.value))}
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
    </div>
  );
};

export default EmployeeForm;
