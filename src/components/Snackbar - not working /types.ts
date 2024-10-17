import { SnackbarCloseReason } from "@mui/material"

export interface SnackbarProps {
  message: string
  buttonName: string
    handleClick: () => void
//   handleClick: () => Promise<void>
  handleClose?: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => void
  open: boolean
  action?: JSX.Element
}
