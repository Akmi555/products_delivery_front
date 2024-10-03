import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartObjProps } from "./types"
import { productDescriptionAction } from "store/redux/oneProduct/oneProductDescriptionSlice"
import { useNavigate } from "react-router-dom"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { AddToCartData } from "store/redux/cart/types"
import { cartActions } from "store/redux/cart/cartSlice"
import { ProductDescriptionProps } from "components/ProductDetailsCard/types"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Img, Name, Price, ProductWrapper, Quantity, Sum } from "./styles"

function CartComponent(
  { cartObjData }: cartObjProps,
  { productData }: ProductDescriptionProps,
) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // информация о корзине
  const id: number = cartObjData.id
  const cartId: number = cartObjData.cartId
  const productId: number = cartObjData.productId
  const productQuantity: number = cartObjData.productQuantity
  const sum: number = cartObjData.sum
  //  информация о товаре
  const title: string = productData.title
  const price: number = productData.price
  const minQuantity: string = productData.minQuantity
  const description: string = productData.description
  const photoLink: string = `/api/files/download/${productData.photoLink}`

  // получение айди залогиненного пользователя
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const userId: number | undefined = currentUser?.id

  // увеличить количество товара в корзине
  const onAddToCart = () => {
    dispatch(cartActions.addProductToCart({ userId, productId }))
  }

  // открыть страницу продукта
  const openCurrentProduct = () => {
    dispatch(productDescriptionAction.openProduct(productId))
    navigate("/oneProductCard")
  }

  return (
    <ProductWrapper>
      <Img src={photoLink}></Img>
      <Name>{title}</Name>
      <Quantity>Quantity: {productQuantity}</Quantity>
      <Price> Price: {price}</Price>
      <Sum> Total amount: {sum}</Sum>
    </ProductWrapper>
  )
}

export default CartComponent
