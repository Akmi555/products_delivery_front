import { Link, useMatch } from "react-router-dom"
import userWhite from "assets/user-white.png"
import cartWhite from "assets/shopping-cart-white.png"
import userGreen from "assets/user-green.png"
import cartGreen from "assets/shopping-cart-green.png"
import { LinkImg } from "./styles"
import { LinkHeaderCustomizedProps } from "./types"

function LinkHeaderCustomized({
  to,
  whiteImg,
  greenImg,
}: LinkHeaderCustomizedProps) {
  const match = useMatch(to)

  return (
    <Link to={to}>
      <LinkImg src={match ? greenImg : whiteImg} />
      {/* <LinkImg src={({match})=>({match? greenImg : whiteImg})} /> */}
    </Link>
  )
}
export default LinkHeaderCustomized
