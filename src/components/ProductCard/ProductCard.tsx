import {
  ButtonContainer,
  ImgContainer,
  PhotoNameWrapper,
  PriceButtonContainer,
  ProductMainInfo,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"
import { ProductCardProps } from "./types"
import { useAppDispatch } from "store/hooks"
import { productDescriptionAction } from "store/redux/oneProduct/oneProductDescriptionSlice"
import ProductButton from "components/ProductButton/ProductButton"
import { useNavigate } from "react-router-dom"

function ProductCard({ productData }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const productId: number = productData.id
  const photoLink: string = `/api/files/download/${productData.photoLink}`
  const title: string = productData.title
  const minQuantity: string = productData.minQuantity
  const price: number = productData.price

  const openCurrentProduct = () => {
    dispatch(productDescriptionAction.openProduct(productId))
    navigate("/oneProductCard")
  }

  // ! РЕАЛИЗОВАТЬ ДОБАВЛЕНИЕ В КОРЗИНУ
  // const onAddToCart= () => {
  //   dispatch(productsAction.addProductToCart(productData.productData.id))
  //   // ТУТ МОЖНО ДОБАВИТЬ АЛЕРТ ИЛИ ДРУГОЕ ПОДТВЕРЖДЕНИЕ ЧТО ДЕЙСТВИЕ ПРОШЛО УСПЕШНО
  // }

  return (
    <ProductWrapper>
        <PhotoNameWrapper>
      <ImgContainer>
        <ProductButton
          type="button"
          imgSrc={photoLink}
          onClick={openCurrentProduct}
        ></ProductButton>
      </ImgContainer>
      </PhotoNameWrapper>
      <ProductMainInfo>
        <ProductButton
          type="button"
          buttonName={title}
          onClick={openCurrentProduct}
        ></ProductButton>
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
