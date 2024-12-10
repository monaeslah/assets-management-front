export interface Asset {
  id: number
  name: string
  type: string
  serialNumber: string
  status: 'AVAILABLE' | 'CHECKED_OUT'
  assignedUserId?: number | null
  assignedUser?: {
    id: number
    name: string
    department: string
  } | null
}
