import {
  ButtonContainer,
  ImgContainer,
  ImgProduct,
  MainInfoAndImgContainer,
  PriceButtonContainer,
  ProductDescription,
  ProductDescriptionContainer,
  ProductMainInfoContainer,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"
import { ProductDescriptionProps } from "./types"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions } from "store/redux/cart/cartSlice"
import { AddToCartData } from "store/redux/cart/types"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"

function ProductDetailsCard({ productData }: ProductDescriptionProps) {
  const dispatch = useAppDispatch()

  const productId: number = productData.id
  const title: string = productData.title
  const price: number = productData.price
  const minQuantity: string = productData.minQuantity
  const description: string = productData.description
  const photoLink: string = `/api/files/download/${productData.photoLink}`

  // получение айди залогиненного пользователя, надо чтобы добавлять продукты в корзину
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const currentUserID: number | undefined = currentUser?.id

  // сбор данных для добавления в корзину в 1 объект, чтобы передать ниже в функцию addProductToCart(...)
  const addToCartData: AddToCartData = {
    userId: currentUserID,
    productId: productId,
  }

  const onAddToCart = () => {
    dispatch(cartActions.addProductToCart(addToCartData))
  }

  return (
    <ProductWrapper>
      <MainInfoAndImgContainer>
        <ImgContainer>
          <ImgProduct src={photoLink} />
        </ImgContainer>
        <ProductMainInfoContainer>
          <ProductName>{title}</ProductName>
          <ProductWeight>{minQuantity}</ProductWeight>
          <PriceButtonContainer>
            <ProductPrice>{price} €</ProductPrice>
            <ButtonContainer>
              <Button imgSrc={cartWhite} type="button" onClick={onAddToCart} />
            </ButtonContainer>
          </PriceButtonContainer>
        </ProductMainInfoContainer>
      </MainInfoAndImgContainer>
      <ProductDescriptionContainer>
        <ProductName>{title}</ProductName>
        <ProductDescription>{description}</ProductDescription>
      </ProductDescriptionContainer>
    </ProductWrapper>
  )
}

export default ProductDetailsCard
