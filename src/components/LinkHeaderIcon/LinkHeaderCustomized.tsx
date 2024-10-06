import { Link, useMatch } from "react-router-dom"

import { LinkImg, LinkText } from "./styles"
import { LinkHeaderCustomizedProps } from "./types"

function LinkHeaderCustomized({
  to,
  whiteImg,
  greenImg,
  linkText,
  children
}: LinkHeaderCustomizedProps) {
  const match = useMatch(to)

  return (
    <Link to={to}>
      {!linkText && <LinkImg src={match ? greenImg : whiteImg} />}
      {linkText && <LinkText> {linkText}</LinkText>}
      {/* <LinkImg src={({match})=>({match? greenImg : whiteImg})} /> */}
      {children && children}
    </Link>
  )
}
export default LinkHeaderCustomized


