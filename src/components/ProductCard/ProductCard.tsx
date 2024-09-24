import {
  ButtonContainer,
  ImgProduct,
  PriceButtonContainer,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import { ProductCardProps } from "./types"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"

function ProductCard({ img, name, weight, price }: ProductCardProps) {
  return (
    <ProductWrapper>
      <ImgProduct src={img} />
      <ProductName>{name}</ProductName>
      <ProductWeight>{weight} g</ProductWeight>
      <PriceButtonContainer>
        <ProductPrice>{price} €</ProductPrice>
        <ButtonContainer>
          <Button imgSrc={cartWhite} type="button" />
        </ButtonContainer>
      </PriceButtonContainer>
    </ProductWrapper>
  )
}

export default ProductCard
