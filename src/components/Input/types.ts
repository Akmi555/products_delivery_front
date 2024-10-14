import { FormikErrors } from "formik"
import { HTMLInputTypeAttribute, ChangeEvent } from "react"

export interface InputProps {
  id: string
  name: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  label: string
  disabled?: boolean
  error?: string | undefined | FormikErrors<Date>
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
