import { HTMLInputTypeAttribute, ChangeEvent, RefObject } from "react"

export interface InputProps {
  type?: HTMLInputTypeAttribute
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  accept?: string
  //!  починить any
  $ref?: null | RefObject<HTMLInputElement> 
}
