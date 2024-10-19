import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { productsSelectors } from "store/redux/allProducts/allProductsSlice"
import { cartActions } from "store/redux/cart/cartSlice"

import ButtonMain from "components/ButtonMain/ButtonMain"
import ProductButton from "components/ProductButton/ProductButton"

import { Tooltip } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

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
import { ProductCardProps } from "./types"

import cartWhite from "assets/shopping-cart-white.png"

function ProductCard({ productData }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const productId: number = productData.id
  const photoLink: string = `/api/files/download/${productData.photoLink}`
  const title: string = productData.title
  const minQuantity: string = productData.minQuantity
  const price: number = productData.price

  const { error } = useAppSelector(productsSelectors.productsState)

  // функция которая стоит на картинке и имени товара чтобы открыть этот товар в новом окне
  const openCurrentProduct = () => {
    navigate(`/${productId}`)
  }

  // для всплывающего окна
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleClick = () => {
    if (localStorage.getItem("accessToken")) {
      dispatch(cartActions.addProductToCart(productId))
    } else if (!localStorage.getItem("accessToken")) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ProductWrapper>
      <PhotoNameWrapper>
        <Tooltip title="Open product">
          <ImgContainer>
            <ProductButton
              type="button"
              imgSrc={photoLink}
              onClick={openCurrentProduct}
            ></ProductButton>
          </ImgContainer>
        </Tooltip>
      </PhotoNameWrapper>
      <ProductMainInfo>
        <Tooltip title="Open product">
          <ProductButton
            type="button"
            buttonName={title}
            onClick={openCurrentProduct}
          ></ProductButton>
        </Tooltip>
        <ProductWeight>{minQuantity}</ProductWeight>
        <PriceButtonContainer>
          <ProductPrice>{price} €</ProductPrice>

          <Tooltip title="Add to cart">
            <ButtonContainer>
              <ButtonMain
                imgSrc={cartWhite}
                type="button"
                onClick={handleClick}
              />
              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {"Oops!"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {!error && (
                      <>
                        You are not logged in at the moment. To use cart you
                        need to have an account.
                      </>
                    )}
                    {error && <>{error}</>}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <ButtonMain
                    buttonName="Log in"
                    type="button"
                    onClick={() => {
                      navigate("/login")
                    }}
                  />
                </DialogActions>
              </Dialog>
            </ButtonContainer>
          </Tooltip>
        </PriceButtonContainer>
      </ProductMainInfo>
    </ProductWrapper>
  )
}

export default ProductCard
