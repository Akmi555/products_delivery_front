import { useAppDispatch } from "store/hooks"
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
import { IconButton, Stack } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useState } from "react"
import ButtonMain from "components/Button/Button"
import { cartActions } from "store/redux/cart/cartSlice"

function CartComponent({ cartObjData }: cartObjProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
    dispatch(cartActions.deleteProductFromCart(productId))
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
          <IconButton aria-label="delete" onClick={deleteProduct}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </PriceContainer>
    </ProductWrapper>
  )
}

export default CartComponent
