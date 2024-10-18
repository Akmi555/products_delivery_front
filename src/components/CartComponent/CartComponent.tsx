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

function CartComponent({ cartObjData }: cartObjProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)

  const productId: number = cartObjData.id
  // const productQuantity: number = cartObjData.productQuantity
  const title: string | undefined = cartObjData.title
  const price: number | undefined = cartObjData.price
  const photoLink: string | undefined =
    `/api/files/download/${cartObjData.photoLink}`

  const [newAm, setNewAm] = useState<number>(cartObjData.productQuantity)

  const onPlus = () => {
    setNewAm(newAm + 1)
    const am = newAm + 1
    dispatch(cartActions.changeAmountInCart({ productId, newAmount: am }))
  }

  const onMinus = () => {
    if (newAm > 1) {
      setNewAm(newAm - 1)
      const am = newAm - 1
      dispatch(cartActions.changeAmountInCart({ productId, newAmount: am }))
    }
  }

  // открыть страницу продукта
  const openCurrentProduct = () => {
    // dispatch(oneProductAction.openProduct(productId))
    navigate(`/${productId}`)
  }

  // удалить продукт из корзины
  const deleteProduct = () => {
    if (allProductsFromCart.length === 1) {
      dispatch(cartActions.deleteCart())
    } else {
      dispatch(cartActions.deleteProductFromCart(productId)).then(() => {
        dispatch(cartActions.openCart())
      })
    }
  }
  return (
    <ProductWrapper>
      <ImgContainer>
        <ProductButton
          type="button"
          imgSrc={photoLink}
          onClick={openCurrentProduct}
        ></ProductButton>
        {/* <Img src={photoLink}></Img> */}
      </ImgContainer>
      <InfoContainer>
        <ProductButton
          type="button"
          buttonName={title}
          onClick={openCurrentProduct}
        ></ProductButton>
        {/* <Name>{title}</Name> */}
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
