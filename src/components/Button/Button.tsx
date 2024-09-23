import { ButtonStyledProps } from "./types"

function Button({
  imgSrc = undefined,
  type = "button",
  buttonName,
  onClick,
}: ButtonStyledProps) {
  return (
    <Button imgSrc={imgSrc} type={type} buttonName={buttonName} onClick={onClick}></Button>
  )
}

export default Button
