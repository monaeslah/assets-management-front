import React, { useEffect, useState } from "react";
import { useEmployees } from "../../context/employeesContext";
import Table from "../../components/table";
import EmployeeForm from "../../components/employeeform.tsx";
import ConfirmModal from "../../components/confirmmodal";
import { Employee } from "../../types/employee";
import { toast } from "react-toastify";
import { fetchDepartments } from "../../services/employeeSevice.ts";
import { Department } from "../../types/department.ts";
import AssetButton from "../../components/button.tsx";
const EmployeesPage: React.FC = () => {
  const {
    employees,
    error,
    fetchEmployees,

    editEmployee,
    deleteEmployee,
  } = useEmployees();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetchEmployees();
    (async () => {
      const data = await fetchDepartments();
      setDepartments(data);
    })();
  }, []);

  const handleEdit = async (updates: Partial<Employee>) => {
    if (employeeToEdit) {
      try {
        await editEmployee(employeeToEdit.id, updates);
        fetchEmployees();
        toast.success("Employee has been updated successfully!");
      } catch (error) {
        toast.error("Failed to update the employee. Please try again.");
      } finally {
        setEmployeeToEdit(null);
        setIsAddModalOpen(false);
      }
    }
  };

  const handleDelete = async () => {
    if (employeeToDelete !== null) {
      await deleteEmployee(employeeToDelete);
      setIsDeleteModalOpen(false);
      toast.success("Employee has been deleted successfully!");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <div id="header">
        {" "}
        <h1>Employees</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <AssetButton
          label={"Add Employee"}
          enable={true}
          size="medium"
          className={"primary-btn margin-top"}
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <Table
        data={employees}
        columns={[
          { header: "Name", accessor: "name" },
          {
            header: "Department",
            accessor: "department",
            render: (value) => value?.name || "No Department",
          },
          { header: "Role", accessor: "role" },
        ]}
        onEdit={(id) => {
          const employee = employees.find((e) => e.id === id);
          if (employee) {
            setEmployeeToEdit(employee);
            setIsAddModalOpen(true);
          }
        }}
        onDelete={(id) => {
          setEmployeeToDelete(id);
          setIsDeleteModalOpen(true);
        }}
      />
      <EmployeeForm
        isOpen={isAddModalOpen}
        onClose={() => {
          setEmployeeToEdit(null);
          setIsAddModalOpen(false);
        }}
        onSave={handleEdit}
        initialData={employeeToEdit || null}
        departments={departments}
      />
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        message="Are you sure you want to delete this employee?"
      />
    </div>
  );
};

export default EmployeesPage;
