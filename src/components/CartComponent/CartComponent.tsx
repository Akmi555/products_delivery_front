import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartObjProps } from "./types"
import {
  productDescriptionAction,
  productDescriptionSelectors,
} from "store/redux/oneProduct/oneProductSlice"
import { useNavigate } from "react-router-dom"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { cartActions } from "store/redux/cart/cartSlice"
import { ProductDescriptionProps } from "components/ProductDetailsCard/types"
import { Img, Name, Price, ProductWrapper, Quantity, Sum } from "./styles"
import { useEffect } from "react"

function CartComponent({ cartObjData }: cartObjProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // информация о корзине
  const id: number = cartObjData.id
  const cartId: number = cartObjData.cartId
  const productId: number = cartObjData.productId
  const productQuantity: number = cartObjData.productQuantity
  const sum: number = cartObjData.sum

  //  информация о товаре
  // получаем информацию о продукте который лежит в корзине
  const { currentProduct } = useAppSelector(
    productDescriptionSelectors.productState,
  )

  const title: string | undefined = currentProduct?.title
  const price: number | undefined = currentProduct?.price
  const minQuantity: string | undefined = currentProduct?.minQuantity
  const description: string | undefined = currentProduct?.description
  const photoLink: string | undefined =
    `/api/files/download/${currentProduct?.photoLink}`


  // получение айди залогиненного пользователя чтобы мочь добавлять товар в корзину
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

  useEffect(() => {
    dispatch(productDescriptionAction.openProduct(productId))
  }, [])
  return (
    <ProductWrapper>
      <Img src={photoLink}></Img>
      <Name>title: {title}</Name>
      <Name>id: {id}</Name>
      {/* <Name>cartId: {cartId}</Name> */}
      <Name>productId: {productId}</Name>
      <Quantity>Quantity: {productQuantity}</Quantity>
      {/* <Price> Price: {price}</Price> */}
      <Sum> Total amount: {sum}</Sum>
    </ProductWrapper>
  )
}

export default CartComponent
