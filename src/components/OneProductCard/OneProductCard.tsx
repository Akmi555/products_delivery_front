import {
  ButtonContainer,
  GoBackButtonWrapper,
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
import ButtonMain from "components/ButtonMain/ButtonMain"
import cartWhite from "assets/shopping-cart-white.png"
import { useAppDispatch } from "store/hooks"
import { cartActions } from "store/redux/cart/cartSlice"
import { ProductDescriptionProps } from "./types"
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded"
import Grid from "@mui/material/Grid"
import { IconButton, Tooltip } from "@mui/material"

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
      <GoBackButtonWrapper>
        <Tooltip title="Go back">
          <IconButton
            aria-label="back"
            onClick={() => {
              window.history.back()
            }}
          >
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </Tooltip>
      </GoBackButtonWrapper>
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
              <ButtonMain
                imgSrc={cartWhite}
                type="button"
                onClick={onAddToCart}
              />
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
