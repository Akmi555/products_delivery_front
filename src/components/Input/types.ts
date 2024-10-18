import { FormikErrors } from "formik"
import { HTMLInputTypeAttribute, ChangeEvent } from "react"
import { ReactNode } from "react"

export interface InputProps {
  id: string
  name: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  label: string
  disabled?: boolean
  error?: any
  // | ReactNode | string | FormikErrors<Date> | undefined
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
