import React, { createContext, useState, ReactNode } from "react";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeSevice";
import { EmployeeContextType } from "../types/employee";
import { handleApiError } from "../utilites/index";

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);

      setError(null);
    } catch (error) {
      setError("Failed to fetch employees");
      throw handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employee: Omit<Employee, "id">) => {
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees((prev) => [...prev, newEmployee]);
    } catch (error) {
      throw handleApiError(error);
    }
  };

  const editEmployee = async (id: number, updates: Partial<Employee>) => {
    try {
      const updatedEmployee = await updateEmployee(id, updates);
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === id ? updatedEmployee : employee
        )
      );
    } catch (error) {
      throw handleApiError(error);
    }
  };

  const deleteEmployee = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (error) {
      throw handleApiError(error);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployees,
        addEmployee,
        editEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = React.useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeeProvider");
  }
  return context;
};
