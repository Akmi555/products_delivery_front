import { useAppDispatch, useAppSelector } from "store/hooks"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"

import { IconButton, Stack, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

import ButtonMain from "components/ButtonMain/ButtonMain"
import ProductButton from "components/ProductButton/ProductButton"

import {
  Counter,
  ImgContainer,
  InfoContainer,
  Price,
  PriceContainer,
  ProductWrapper,
  SelectContainer,
  Amount,
} from "./styles"
import { cartObjProps } from "./types"
import { ToastContainer, toast } from "react-toastify"

function CartComponent({ cartObjData }: cartObjProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { allProductsFromCart, error } = useAppSelector(cartSelectors.cartState)
  const [newAm, setNewAm] = useState<number>(cartObjData.productQuantity)
  const productId: number = cartObjData.id
  const title: string | undefined = cartObjData.title
  const price: number | undefined = cartObjData.price
  const photoLink: string | undefined =
    `/api/files/download/${cartObjData.photoLink}`
  const notifyDeleteProductRejected = () =>
    toast.error(`${cartObjData.title} was not deleted. Error: ${error}`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  const notifyDeleteProductFulfilled = () =>
    toast.success(`${cartObjData.title} was deleted from cart`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })

  const onPlus = () => {
    setNewAm(newAm + 1)
    const am: number = newAm + 1
    dispatch(cartActions.changeAmountInCart({ productId, newAmount: am }))
  }

  const onMinus = () => {
    if (newAm > 1) {
      setNewAm(newAm - 1)
      const am: number = newAm - 1
      dispatch(cartActions.changeAmountInCart({ productId, newAmount: am }))
    }
  }

  // открыть страницу продукта
  const openCurrentProduct = () => {
    navigate(`/products/${productId}`)
  }

  // удалить продукт из корзины
  const deleteProduct = async () => {
    if (allProductsFromCart.length === 1) {
      dispatch(cartActions.deleteCart())
    } else {
      const dispatchResult = await dispatch(
        cartActions.deleteProductFromCart(productId),
      )

      if (cartActions.deleteProductFromCart.fulfilled.match(dispatchResult)) {
        dispatch(cartActions.openCart())
        setTimeout(() => notifyDeleteProductFulfilled(), 100)
      }

      if (cartActions.deleteProductFromCart.rejected.match(dispatchResult)) {
        notifyDeleteProductRejected()
      }
    }
  }
  
  return (
    <ProductWrapper>
      <ToastContainer />
      <ImgContainer>
        <ProductButton
          type="button"
          imgSrc={photoLink}
          onClick={openCurrentProduct}
        ></ProductButton>
      </ImgContainer>
      <InfoContainer>
        <ProductButton
          type="button"
          buttonName={title}
          onClick={openCurrentProduct}
        ></ProductButton>
        <SelectContainer>
          <Counter>
            <ButtonMain buttonName="-" onClick={onMinus} />
            <Amount>{newAm}</Amount>
            <ButtonMain buttonName="+" onClick={onPlus} />
          </Counter>
        </SelectContainer>
      </InfoContainer>
      <PriceContainer>
        <Price>€ {price}</Price>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Delete product">
            <IconButton aria-label="delete" onClick={deleteProduct}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </PriceContainer>
    </ProductWrapper>
  )
}

export default CartComponent
