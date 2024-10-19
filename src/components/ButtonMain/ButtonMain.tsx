import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import { ButtonImg } from "./styles"
import { ButtonStyledProps } from "./types"
import { colors } from "styles/colors"

function ButtonMain({
  imgSrc = undefined,
  type = "button",
  buttonName,
  onClick,
  disabled = false,
  color = colors.MAIN_GREEN,
}: ButtonStyledProps) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        disabled={disabled}
        type={type}
        variant="contained"
        onClick={onClick}
        style={{
          borderRadius: 50,
          width: "100%",
          backgroundColor: `${color}`,
        }}
      >
        {buttonName}
        {imgSrc && <ButtonImg src={imgSrc}></ButtonImg>}
      </Button>
    </Stack>
  )
}

export default ButtonMain
