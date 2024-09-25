import {
  ButtonContainer,
  ImgContainer,
  ImgProduct,
  LinkProductCard,
  PhotoNameWrapper,
  PriceButtonContainer,
  ProductMainInfo,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"
import { ProductCardProps } from "./types"

function ProductCard({
  productData,
  isSinglePageProduct = false,
}: ProductCardProps) {
  const photoLink: string = productData.photoLink
  const title: string = productData.title
  const minQuantity: string = productData.minQuantity
  const price: number = productData.price

  // РЕАЛИЗОВАТЬ ДОБАВЛЕНИЕ В КОРЗИНУ
  // const onAddToCart= () => {
  //   dispatch(productsAction.addProductToCart(productData.productData.id))
  //   // ТУТ МОЖНО ДОБАВИТЬ АЛЕРТ ИЛИ ДРУГОЕ ПОДТВЕРЖДЕНИЕ ЧТО ДЕЙСТВИЕ ПРОШЛО УСПЕШНО
  // }

  return (
    <ProductWrapper isSinglePageProduct={isSinglePageProduct}>
      <PhotoNameWrapper>
        <LinkProductCard to="/oneProductCard">
          <ImgContainer>
            <ImgProduct src={photoLink} />
          </ImgContainer>
        </LinkProductCard>
      </PhotoNameWrapper>

      <ProductMainInfo>
        <LinkProductCard to="/oneProductCard">
          <ProductName>{title}</ProductName>
        </LinkProductCard>
        <ProductWeight>{minQuantity}</ProductWeight>
        <PriceButtonContainer>
          <ProductPrice>{price} €</ProductPrice>
          <ButtonContainer>
            <Button imgSrc={cartWhite} type="button" />
          </ButtonContainer>
        </PriceButtonContainer>
      </ProductMainInfo>
    </ProductWrapper>
  )
}

export default ProductCard
