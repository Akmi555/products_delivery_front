import { ButtonStyledProps } from "components/ButtonMain/types"

export interface MessageButtonProps {
  buttonProps: ButtonStyledProps
  messageProps: MessageProps
}

export interface MessageProps {
  responsiveDialogTitle?: string
  dialogContentText?: string
  agreeButtonText?: string
  disagreeButtonText?: string
  handleAgree?: (event: MouseEvent) => void
  handleDisagree?: (event: MouseEvent) => void
}
