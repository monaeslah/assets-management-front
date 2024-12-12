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
export interface AssetFormProps {
  isOpen: boolean
  initialData?: {
    id: number
    name: string
    type: string
    serialNumber: string
    status: string
    assignedUser?: string | null
  }
  onSave: (formData: {
    name: string
    type: string
    serialNumber: string
    status: string
    assignto: string | number | null
  }) => void
  onClose: () => void
}
