import { Button } from "@mui/material"
import { colors } from "styles/colors"
import CotegoryButtonProps from "./types"

function CategoryButton({
  name,
  onClick,
  color = "gray",
}: CotegoryButtonProps) {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: { color },
        border: `1px solid ${color}`,
        borderRadius: 50,
        minheight: 50,
        minWidth: 80,
        padding: 1.5,
        ":hover": {
          bgcolor: colors.BACKGROUND_GRAY,
          border: `1px solid ${colors.MAIN_GREEN}`,
          color: colors.MAIN_GREEN,
        },
      }}
    >
      {name}
    </Button>
  )
}

export default CategoryButton
