import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartObjProps } from "./types"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { useNavigate } from "react-router-dom"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { cartActions } from "store/redux/cart/cartSlice"
import { Img, Name, Price, ProductWrapper, Quantity, Sum } from "./styles"

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
      <Img src={photoLink}></Img>
      <Name>title: {title}</Name>
      <Name>productId: {productId}</Name>
      <Quantity>Quantity: {productQuantity}</Quantity>
      <Price> Price: {price}</Price>
      <Sum> Total amount: {sum}</Sum>
    </ProductWrapper>
  )
}

export default CartComponent
