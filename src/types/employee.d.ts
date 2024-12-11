export interface Employee {
  id: number
  email: string
  role: 'EMPLOYEE' | 'HR_MANAGER'
  createdAt: string
  updatedAt?: string
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
