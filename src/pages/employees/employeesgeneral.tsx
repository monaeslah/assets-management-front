import React, { useEffect } from "react";
import { useEmployees } from "../../context/employeesContext";

const EmployeesPage = () => {
  const { employees, fetchEmployees, loading, error } = useEmployees();

  useEffect(() => {
    fetchEmployees();
  }, []);
  console.log(employees);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesPage;
