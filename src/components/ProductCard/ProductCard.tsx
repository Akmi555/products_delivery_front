import {
  ButtonContainer,
  ImgContainer,
  ImgProduct,
  PriceButtonContainer,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"
import { ProductDataProps } from "./types"

function ProductCard(productData: ProductDataProps) {
  const photoLink: string = productData.productData.photoLink
  const title: string = productData.productData.title
  const minQuantity: number = productData.productData.minQuantity
  const price: number = productData.productData.price

  // РЕАЛИЗОВАТЬ ДОБАВЛЕНИЕ В КОРЗИНУ 
  // const onAddToCart= () => {
  //   dispatch(productsAction.addProductToCart(productData.productData.id))
  //   // ТУТ МОЖНО ДОБАВИТЬ АЛЕРТ ИЛИ ДРУГОЕ ПОДТВЕРЖДЕНИЕ ЧТО ДЕЙСТВИЕ ПРОШЛО УСПЕШНО
  // }

  return (
    <ProductWrapper>
      <ImgContainer>
        <ImgProduct src={photoLink} />
      </ImgContainer>

      <ProductName>{title}</ProductName>
      <ProductWeight>{minQuantity}</ProductWeight>
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
