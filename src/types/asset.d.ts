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
  initialData?: Omit<Asset, 'assignedUser'> & {
    assignedUser?: Asset['assignedUser']
  }
  onSave: (formData: {
    name: string
    type: string
    serialNumber: string
    status: string
    assignedUserId: number | null
  }) => void
  onClose: () => void
}
