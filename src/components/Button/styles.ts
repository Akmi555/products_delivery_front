import styled from "@emotion/styled/macro";
import { colors } from "styles/colors";
import { ButtonStyledProps } from "./types";

export const ButtonStyled = styled("button")<ButtonStyledProps>`
height: 65px;
width: 100%;
cursor: pointer;
background-color: ${colors.MAIN_GREEN};

`

export const ButtonImg = styled("img")`
  width: 40px;
  height: 40px;
`