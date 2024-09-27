import {
  ButtonContainer,
  ImgContainer,
  ImgProduct,
  PriceButtonContainer,
  ProductDescription,
  ProductDescriptionContainer,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"
import { ProductDescriptionProps } from "./types"
import { useAppDispatch } from "store/hooks"

function ProductDetailsCard({ productData }: ProductDescriptionProps) {
  const title: string = productData.title
  const price: number = productData.price
  const minQuantity: string = productData.minQuantity
  const description: string = productData.description
  const photoLink: string = productData.photoLink

  // ! РЕАЛИЗОВАТЬ ДОБАВЛЕНИЕ В КОРЗИНУ
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

      <ProductDescriptionContainer>
        <ProductName>{title}</ProductName>
        <ProductDescription>{description}</ProductDescription>
      </ProductDescriptionContainer>
    </ProductWrapper>
  )
}

export default ProductDetailsCard
