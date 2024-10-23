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
import { ToastContainer, toast } from "react-toastify"

function ProductCard({ productData }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { error } = useAppSelector(productsSelectors.productsState)
  const productId: number = productData.id
  const photoLink: string = `/api/files/download/${productData.photoLink}`
  const title: string = productData.title
  const minQuantity: string = productData.minQuantity
  const price: number = productData.price
  // для всплывающего окна
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const notifyAddedToCartSuccessfully = () =>
    toast.success(`${productData.title} was added to cart`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  const notifyAddedToCartRejected = () =>
    toast.error(
      `Coud not add ${productData.title} to cart. Try again or contact support`,
      {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      },
    )
  const openCurrentProduct = () => {
    navigate(`/products/${productId}`)
  }

  const handleClick = async () => {
    if (localStorage.getItem("accessToken")) {
      const dispatchResult = await dispatch(
        cartActions.addProductToCart(productId),
      )

      // пример как выполнить что то при fulfilled
      if (cartActions.addProductToCart.fulfilled.match(dispatchResult)) {
        notifyAddedToCartSuccessfully()
      }
      // пример как выполнить что то при rejected
      if (cartActions.addProductToCart.rejected.match(dispatchResult)) {
        notifyAddedToCartRejected()
      }
    } else if (!localStorage.getItem("accessToken")) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ProductWrapper>
      <ToastContainer />
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
