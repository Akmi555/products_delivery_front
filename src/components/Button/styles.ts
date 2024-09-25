import styled from "@emotion/styled";
import { colors } from "styles/colors";
import { ButtonStyledProps } from "./types";

export const ButtonStyled = styled("button")<ButtonStyledProps>`
height: 40px;
width: 100%;
cursor: pointer;
background-color: ${colors.MAIN_GREEN};
border: none;
border-radius: 50px;
`

export const ButtonImg = styled.img`
  width: 20px;
  height: 20px;
`