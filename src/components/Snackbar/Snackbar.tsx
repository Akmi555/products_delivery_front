import Button from "@mui/material/Button"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { Fragment, ReactElement, useState } from "react"
import ButtonMain from "components/ButtonMain/ButtonMain"
import { SnackbarProps } from "./types"

export default function SimpleSnackbar(SnackbarData: SnackbarProps) {
  // это все должно быть в объекте куда ставим Snackbar
  //   const [open, setOpen] = useState<boolean>(false)

  //   const handleClick = () => {
  //     setOpen(true)
  //   }

  //     const handleClose = (
  //       event: React.SyntheticEvent | Event,
  //       reason?: SnackbarCloseReason,
  //     ) => {
  //       if (reason === "clickaway") {
  //         return
  //       }

  //       setOpen(false)
  //     }

  // это кнопка в окошке
  // const action = (
  //   <Fragment>
  //     <Button color="secondary" size="small" onClick={handleClose}>
  //       UNDO
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </Fragment>
  // )

  return (
    <>
      <ButtonMain
        onClick={SnackbarData.handleClick}
        buttonName={SnackbarData.buttonName}
      ></ButtonMain>
      <Snackbar
        open={SnackbarData.open}
        autoHideDuration={6000}
        onClose={SnackbarData.handleClose}
        message={SnackbarData.message}
        action={SnackbarData.action}
      />
    </>
  )
}
