export interface Employee {
  id: number
  email: string
  password?: string
  role: string
  createdAt: string
  updatedAt?: string
  name: string
  departmentId: number
  department?: Department
  //welcome packaging?
}

export type EmployeeContextType = {
  employees: Employee[]

  hrManagers: Employee[]

  loading: boolean
  error: string | null
  fetchEmployees: () => Promise<void>
  addEmployee: (employee: Omit<Employee, 'id' | 'role'>) => Promise<void>
  editEmployee: (
    id: number,
    updates: Partial<Omit<Employee, 'role'>>
  ) => Promise<void>
  deleteEmployee: (id: number) => Promise<void>
}
