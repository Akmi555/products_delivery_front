import styled from "@emotion/styled"
import { Dialog } from "@mui/material"

export const StyledModalWrapper = styled(Dialog)`
  & .MuiPaper-root {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 28px;
    width: fit-content;
    height: fit-content;
    padding: 40px;
  }
`
