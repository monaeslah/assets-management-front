export interface EmployeeContextType {
  employees: Employee[]
  hrManagers: HRManager[] // Include HR Managers
  loading: boolean
  error: string | null
  fetchEmployees: () => Promise<void>
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>
  editEmployee: (id: number, updates: Partial<Employee>) => Promise<void>
  deleteEmployee: (id: number) => Promise<void>
}
