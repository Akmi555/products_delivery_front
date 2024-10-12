import { useAppDispatch } from "store/hooks"
import { cartObjProps } from "./types"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { useNavigate } from "react-router-dom"
import { cartActions } from "store/redux/cart/cartSlice"
import {
  Img,
  ImgContainer,
  InfoContainer,
  Name,
  Price,
  PriceContainer,
  ProductWrapper,
  SelectButtonContainer,
} from "./styles"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { ChangeProductAmountData } from "store/redux/cart/types"
import { useEffect, useState } from "react"

function CartComponent({ cartObjData }: cartObjProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const productId: number = cartObjData.id
  const productQuantity: number = cartObjData.productQuantity
  const title: string | undefined = cartObjData.title
  const price: number | undefined = cartObjData.price
  const photoLink: string | undefined =
    `/api/files/download/${cartObjData.photoLink}`

 
    const [newAmount, setNewAmount] = useState(String(productQuantity));
    const changeAmountData: ChangeProductAmountData = {
      productId: productId,
      newAmount: Number(newAmount),
    }
    // console.log(newAmount)
    // изменить кол-во у продукта в корзине
    const changeAmount = () => {
      dispatch(cartActions.changeAmountInCart(changeAmountData))
      // console.log(newAmount)
    }
    const handleChange = (event: SelectChangeEvent) => {
      setNewAmount(event.target.value as string);
      console.log(newAmount)
      changeAmount()
    }
  
  
  
  
  // открыть страницу продукта
  // const openCurrentProduct = () => {
  //   dispatch(oneProductAction.openProduct(productId))
  //   navigate("/one-product-card")
  // }
  return (
    <ProductWrapper>
      <ImgContainer>
        <Img src={photoLink}></Img>
      </ImgContainer>

      <InfoContainer>
        <Name>{title}</Name>
        <SelectButtonContainer>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={String(productQuantity)}
                value={newAmount}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
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
