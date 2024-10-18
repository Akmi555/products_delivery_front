import { IconButton, Tooltip } from "@mui/material"
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded"

import { GoBackButtonWrapper } from "./styles"

function GoBackArrowButton() {
  return (
    <GoBackButtonWrapper>
      <Tooltip title="Go back">
        <IconButton
          aria-label="back"
          onClick={() => {
            window.history.back()
          }}
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </Tooltip>
    </GoBackButtonWrapper>
  )
}

export default GoBackArrowButton
