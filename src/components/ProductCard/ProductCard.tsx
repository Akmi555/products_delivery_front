import {
  ButtonContainer,
  ImgContainer,
  ImgProduct,
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
import { useAppDispatch } from "store/hooks"
import { productDescriptionAction } from "store/redux/oneProduct/oneProductDescriptionSlice"

function ProductCard({ productData }: ProductCardProps) {
  const dispatch = useAppDispatch()

  const productId: number = productData.id
  const photoLink: string = productData.photoLink
  const title: string = productData.title
  const minQuantity: string = productData.minQuantity
  const price: number = productData.price

  const openCurrentProduct = () => {
    dispatch(productDescriptionAction.openProduct(productId))
    // может быть редирект надо будет поставить сюда
  }

  // ! РЕАЛИЗОВАТЬ ДОБАВЛЕНИЕ В КОРЗИНУ
  // const onAddToCart= () => {
  //   dispatch(productsAction.addProductToCart(productData.productData.id))
  //   // ТУТ МОЖНО ДОБАВИТЬ АЛЕРТ ИЛИ ДРУГОЕ ПОДТВЕРЖДЕНИЕ ЧТО ДЕЙСТВИЕ ПРОШЛО УСПЕШНО
  // }

  return (
    <ProductWrapper>
      <PhotoNameWrapper>
        {/* <LinkProductCard to="/oneProductCard"> */}

          <ImgContainer>
            <ImgProduct src={photoLink} />
          </ImgContainer>
          
        {/* </LinkProductCard> */}
      </PhotoNameWrapper>

      <ProductMainInfo>
        {/* <LinkProductCard to="/oneProductCard"> */}
          <ProductName>{title}</ProductName>
        {/* </LinkProductCard> */}
        <ProductWeight>{minQuantity}</ProductWeight>
        <PriceButtonContainer>
          <ProductPrice>{price} €</ProductPrice>
          <ButtonContainer>
            <Button
              imgSrc={cartWhite}
              type="button"
            />
          </ButtonContainer>
        </PriceButtonContainer>
      </ProductMainInfo>
    </ProductWrapper>
  )
}

export default ProductCard
