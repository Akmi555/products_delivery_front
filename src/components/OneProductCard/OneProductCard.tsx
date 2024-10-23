import { useAppDispatch } from "store/hooks"
import { cartActions } from "store/redux/cart/cartSlice"

import ButtonMain from "components/ButtonMain/ButtonMain"

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
import { ProductDescriptionProps } from "./types"

import cartWhite from "assets/shopping-cart-white.png"
import { Tooltip } from "@mui/material"

function ProductDetailsCard({ productData }: ProductDescriptionProps) {
  const dispatch = useAppDispatch()

  const productId: number = productData.id
  const title: string = productData.title
  const price: number = productData.price
  const minQuantity: string = productData.minQuantity
  const description: string = productData.description
  const photoLink: string = `/api/files/download/${productData.photoLink}`

  const onAddToCart = () => {
    dispatch(cartActions.addProductToCart(productId))
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
            <Tooltip title="Add to cart">
              <ButtonContainer>
                <ButtonMain
                  imgSrc={cartWhite}
                  type="button"
                  onClick={onAddToCart}
                />
              </ButtonContainer>
            </Tooltip>
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
