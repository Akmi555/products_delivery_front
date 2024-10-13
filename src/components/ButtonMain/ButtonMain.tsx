import { ButtonImg } from "./styles"
import { ButtonStyledProps } from "./types"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider } from "@mui/material"

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    main_green: Palette["primary"]
    // log_out?: Palette["secondary"]
  }

  interface PaletteOptions {
    main_green?: PaletteOptions["primary"]
    // log_out?: PaletteOptions["secondary"]
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    main_green: true
    // log_out: true
  }
}

const theme = createTheme({
  palette: {
    main_green: {
      main: "#00BF63",
      light: "#02e376",
      dark: "#018344",
      contrastText: "#ffffff",
    },
    // log_out : {
    //   main: "#c43a18",
    //   light: "#f3471c",
    //   dark: "#892810",
    //   contrastText: "#ffffff",
    // }
  },
})

function ButtonMain({
  imgSrc = undefined,
  type = "button",
  buttonName,
  onClick,
}: ButtonStyledProps) {
  return (
    // кнопка до MUI (оставила на всякий )
    // <ButtonStyled type={type} onClick={onClick}>
    //   {buttonName}
    //   {imgSrc && <ButtonImg src={imgSrc}></ButtonImg>}
    // </ButtonStyled>

    <Stack spacing={2} direction="row">
      <ThemeProvider theme={theme}>
        <Button
          type={type}
          variant="contained"
          onClick={onClick}
          color="main_green"
          style={{ borderRadius: 50, width: "100%" }}
        >
          {buttonName}
          {imgSrc && <ButtonImg src={imgSrc}></ButtonImg>}
        </Button>
      </ThemeProvider>
    </Stack>
  )
}

export default ButtonMain
