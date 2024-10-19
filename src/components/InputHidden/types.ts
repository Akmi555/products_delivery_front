import { HTMLInputTypeAttribute, ChangeEvent, RefObject } from "react"

export interface InputProps {
  type?: HTMLInputTypeAttribute
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  accept?: string
  $ref?: null | RefObject<HTMLInputElement> 
}
