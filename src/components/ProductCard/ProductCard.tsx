import {
  ImgProduct,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import { ProductCardProps } from "./types"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"


function ProductCard({ img, name, weight, price}: ProductCardProps) {
  return (
    <ProductWrapper>
      <ImgProduct>{img}</ImgProduct>
      <ProductName>{name}</ProductName>
      <ProductWeight>{weight}</ProductWeight>
      <ProductPrice>{price}</ProductPrice>

      <Button imgSrc={cartWhite}  ></Button>
    </ProductWrapper>
  )
}

export default ProductCard
