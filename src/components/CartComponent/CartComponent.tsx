import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartObjProps } from "./types"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { useNavigate } from "react-router-dom"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { cartActions } from "store/redux/cart/cartSlice"
import {
  Img,
  ImgContainer,
  InfoContainer,
  Name,
  Price,
  PriceContainer,
  ProductId,
  ProductWrapper,
  Quantity,
  SelectButtonContainer,
  Sum,
} from "./styles"

// для раскрывающегося списка с кол-вом товаров
import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import NativeSelect from "@mui/material/NativeSelect"
import { IconButton, Stack } from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"

function CartComponent({ cartObjData }: cartObjProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const productId: number = cartObjData.id
  const productQuantity: number = cartObjData.productQuantity
  const sum: number = cartObjData.sum

  const title: string | undefined = cartObjData.title
  const price: number | undefined = cartObjData.price
  const minQuantity: string | undefined = cartObjData.minQuantity
  const description: string | undefined = cartObjData.description
  const photoLink: string | undefined =
    `/api/files/download/${cartObjData.photoLink}`

  // получение айди залогиненного пользователя чтобы мочь добавлять товар в корзину
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const userId: number | undefined = currentUser?.id
  // увеличить количество товара в корзине
  const onAddToCart = () => {
    dispatch(cartActions.addProductToCart({ userId, productId }))
  }

  // открыть страницу продукта
  const openCurrentProduct = () => {
    dispatch(oneProductAction.openProduct(productId))
    navigate("/oneProductCard")
  }
  return (
    <ProductWrapper>
      <ImgContainer>
        <Img src={photoLink}></Img>
      </ImgContainer>
      
      <InfoContainer>
        <Name>{title}</Name>
        <SelectButtonContainer> 
        <Box sx={{ width: 60 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              quantity
            </InputLabel>
            <NativeSelect
              defaultValue={productQuantity}
              inputProps={{
                name: "quantity",
                id: "uncontrolled-native",
              }}
              onChange={() => {}}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
            </NativeSelect>
          </FormControl>
        </Box>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
        </SelectButtonContainer>
      </InfoContainer>

      <PriceContainer>
        <Price>€ {price}</Price>
      </PriceContainer>
    </ProductWrapper>
  )
}

export default CartComponent
