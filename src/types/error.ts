export interface ApiError {
  message: string
  status?: number
  errors?: Array<{ field: string; message: string }>
}
