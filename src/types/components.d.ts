// src/types/components.d.ts

export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge' | 'remove'

export interface AssetButtonProps {
  size: ButtonSize
  className?: string
  enable: boolean
  onClick: () => void
  label: string
  options?: string[] // Optional array of options for dropdown
}
// src/types/components.d.ts

export interface InputFieldProps {
  className?: string // Optional class name for additional styling
  label?: string // Optional label for the input field
  children?: React.ReactNode // Children elements or JSX
  iconBefore?: string // Optional icon before the input
}
