import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import ButtonMain from "components/ButtonMain/ButtonMain"
import { MessageButtonProps } from "./types"

export default function ResponsiveDialog(
  {buttonProps,messageProps } : MessageButtonProps
) {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

const onClick = () => {
  setOpen(true)
  {buttonProps.onClick}
}

  const handleAgree = () => {
    setOpen(true)
    {messageProps.handleAgree}
  }

  const handleDisagree = () => {
    setOpen(false)
    {messageProps.handleDisagree}
  }

  return (
    <React.Fragment>
      <ButtonMain
        type={buttonProps.type}
        imgSrc={buttonProps.imgSrc}
        buttonName={buttonProps.buttonName}
        onClick={onClick}
      ></ButtonMain>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // тут типа если щелкнуть вокруг окна чтобы оно закрылось , если это надо. то просто допистаь функцию по закрытию окна и вставить 
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {messageProps.responsiveDialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {messageProps.dialogContentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAgree}>
          {messageProps.agreeButtonText}
          </Button>
          <Button onClick={handleDisagree} autoFocus>
          {messageProps.disagreeButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
