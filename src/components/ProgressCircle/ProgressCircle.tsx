import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import { CircleWrapper } from "./styles"

function ProgressCircle() {
  return (
    <CircleWrapper>
      <Stack  spacing={2} direction="row">
        <CircularProgress color="success" />
      </Stack>
    </CircleWrapper>
  )
}

export default ProgressCircle
