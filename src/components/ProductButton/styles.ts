import styled from "@emotion/styled"
import { ButtonStyledProps } from "./types"

export const ButtonStyled = styled("button")<ButtonStyledProps>`
display: flex;
padding: 0;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: white;

`

export const ButtonImg = styled.img`
  width: 200px;
`
