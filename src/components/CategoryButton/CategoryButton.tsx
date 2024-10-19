import { Button } from "@mui/material"
import { colors } from "styles/colors"
import CotegoryButtonProps from "./types"

function CategoryButton({name, onClick} : CotegoryButtonProps) {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: "gray",
        border: "1px solid gray",
        borderRadius: 50,
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
