import styled from "@emotion/styled"
import { colors } from "styles/colors"
import { ButtonStyledProps } from "./types"

export const ButtonStyled = styled("button")<ButtonStyledProps>`
  height: 50px;
  width: 100%;
  cursor: pointer;
  background-color: ${colors.MAIN_GREEN};
  border: none;
  border-radius: 50px;
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  color: white;
`

export const ButtonImg = styled.img`
  width: 20px;
  height: 20px;
`
