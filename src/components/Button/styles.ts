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

  &:hover {
    box-shadow:
      0 0.5em 1em 0 rgba(0, 0, 0, 0.15),
      0 0.4em 0.5em -0.4em rgba(0, 0, 0, 0.4);
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -40px 0 0 -40px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    opacity: 0;
    box-shadow: inset 0 0 0 35px rgba(0, 0, 0, 0.1);
    display: none;
  }

  .button.click:after {
    animation: animate-click 0.6s ease-out forwards;
    display: block;
  }

  @keyframes animate-click {
    0% {
      opacity: 1;
      transform: scale3d(0.4, 0.4, 1);
    }

    80% {
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
      opacity: 0.1;
    }

    100% {
      opacity: 0;
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
      transform: scale3d(1.2, 1.2, 1);
    }
  }
`

export const ButtonImg = styled.img`
  width: 20px;
  height: 20px;
`
