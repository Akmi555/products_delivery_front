import { IconButton, Tooltip } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { ScrollUpButtonWrapper } from "./styles"


function ScrollUpArrowButton () {
    return <ScrollUpButtonWrapper>
        <Tooltip title="Scroll up">
          <IconButton
            aria-label="back"
            onClick={() => {
              window.scroll(0, 0)
            }}
          >
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
      </ScrollUpButtonWrapper>
}


export default ScrollUpArrowButton