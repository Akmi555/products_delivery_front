import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartObjProps } from "./types"
import { useNavigate } from "react-router-dom"
import {
  Counter,
  Img,
  ImgContainer,
  InfoContainer,
  Name,
  Price,
  PriceContainer,
  ProductWrapper,
  SelectContainer,
  Amount,
} from "./styles"
import { IconButton, Stack, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react"
import ButtonMain from "components/ButtonMain/ButtonMain"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"

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
  // const openCurrentProduct = () => {
  //   dispatch(oneProductAction.openProduct(productId))
  //   navigate("/one-product-card")
  // }

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
        <Img src={photoLink}></Img>
      </ImgContainer>
      <InfoContainer>
        <Name>{title}</Name>
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
