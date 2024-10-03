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
import { useAppDispatch, useAppSelector } from "store/hooks"
import { productDescriptionAction } from "store/redux/oneProduct/oneProductDescriptionSlice"
import ProductButton from "components/ProductButton/ProductButton"
import { useNavigate } from "react-router-dom"

import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { cartAction } from "store/redux/cart/cartSlice"
import { AddToCartData } from "store/redux/cart/types"

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

  // получение айди залогиненного пользователя
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const currentUserID: number | undefined = currentUser?.id

  const addToCartData: AddToCartData = {
    userId: currentUserID,
    productId: productId,
  }

  const onAddToCart = () => {
    dispatch(cartAction.addProductToCart(addToCartData))
  }

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
            <Button imgSrc={cartWhite} type="button" onClick={onAddToCart} />
          </ButtonContainer>
        </PriceButtonContainer>
      </ProductMainInfo>
    </ProductWrapper>
  )
}

export default ProductCard
