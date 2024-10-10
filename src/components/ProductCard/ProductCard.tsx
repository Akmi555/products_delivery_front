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
import ButtonMain from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"
import { useAppDispatch } from "store/hooks"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import ProductButton from "components/ProductButton/ProductButton"
import { useNavigate } from "react-router-dom"

import { cartActions } from "store/redux/cart/cartSlice"
import { ProductCardProps } from "./types"


function OneProductCard( {productData} : ProductCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const productId: number = productData.id
  const photoLink: string = `/api/files/download/${productData.photoLink}`
  const title: string = productData.title
  const minQuantity: string = productData.minQuantity
  const price: number = productData.price

  // функция которая стоит на картинке и имени товара чтобы открыть этот товар в новом окне
  const openCurrentProduct = () => {
    dispatch(oneProductAction.openProduct(productId))
    navigate("/one-product-card")
  }

  const onAddToCart = () => {
    dispatch(cartActions.addProductToCart(productId))
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
            <ButtonMain
              imgSrc={cartWhite}
              type="button"
              onClick={onAddToCart}
            />
          </ButtonContainer>
        </PriceButtonContainer>
      </ProductMainInfo>
    </ProductWrapper>
  )
}

export default OneProductCard
