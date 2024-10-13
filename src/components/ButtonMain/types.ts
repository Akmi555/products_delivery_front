import { PaletteColorOptions } from "@mui/material"
import { MouseEvent } from "react"
export type ButtonType = "button" | "submit" | "reset" | undefined

export interface ButtonStyledProps {
  imgSrc?: string | undefined
  type?: ButtonType
  buttonName?: string
  onClick?: (event: MouseEvent) => void
  disabled?: boolean
  //   isTransparent?: boolean
  color?: PaletteColorOptions | undefined
}
