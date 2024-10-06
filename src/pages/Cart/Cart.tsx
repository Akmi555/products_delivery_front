import CartComponent from "components/CartComponent/CartComponent"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"

import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { v4 } from "uuid"
import {
  Amount,
  CartItemsWrapper,
  PageWrapper,
  TotalAmountContainer,
  Text,
  PriceContainer,
  LoginMistakeContainer,
} from "./styles"
import { useEffect, useState } from "react"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { CartAndProductData } from "./types"
import { OneProductObject } from "store/redux/oneProduct/types"
import Button from "components/Button/Button"
import { Link, useNavigate } from "react-router-dom"

function Cart() {
  const [products, setProducts] = useState<OneProductObject[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // получение айди залогиненного пользователя для отображения корзины (запрос находится в useEffect ниже)
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const currentUserID: number | undefined = currentUser?.id

  // получение доступа к стейте со всеми продуктами ИЗ КОРЗИНЫ
  const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)

  let totalAmount: number = 0
  let totalQuantity: number = 0

  for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
    totalAmount = totalAmount + allProductsFromCart[i].sum
  }

  for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
    totalQuantity = totalQuantity + allProductsFromCart[i].productQuantity
  }

  // соединили products и allProductsFromCart в один объект и один массив
  const cartAndProductDat: CartAndProductData[] = products
    .map(product => {
      const cartItem = allProductsFromCart.find(
        item => item.productId === product.id,
      )
      return {
        ...product,
        productQuantity: cartItem ? cartItem.productQuantity : 0,
        sum: cartItem ? cartItem.sum : 0,
      }
    })
    .filter(item => item.productQuantity > 0)

  // отображение элементов корзины
  const cartsAllProducts = cartAndProductDat.map((obj: CartAndProductData) => (
    <CartComponent key={v4()} cartObjData={obj} />
  ))

  // проверка на залогиненного пользователя
  if (currentUserID) {
    useEffect(() => {
      // положили в стейт массив из элементов корзины
      dispatch(cartActions.showCart(currentUserID))

      // вытащили в массив айди тех продуктов, которые в корзине
      const productIds = allProductsFromCart.map(item => item.productId)

      // достаем данные о продуктах (сложная логика)
      const fetchProducts = async () => {
        try {
          const productDataPromises = productIds.map(productId =>
            dispatch(oneProductAction.openProduct(productId)),
          )
          const productsData = await Promise.all(productDataPromises)
          const productsDataPayload = productsData.map(item => item.payload)
          setProducts(productsDataPayload)
        } catch (e) {
          console.error("Error fetching products:", e)
        }
      }
      fetchProducts()
    }, [])
  } else {
    console.log("user is not logged in")
  }

  return (
    <PageWrapper>
      <CartItemsWrapper>{cartsAllProducts}</CartItemsWrapper>
      {currentUserID && (
        <TotalAmountContainer>
          <PriceContainer>
            <Text>Subtotal ({totalQuantity} items):</Text>
            <Amount> € {totalAmount} </Amount>
          </PriceContainer>

          <Button buttonName="Proceed to checkout" />
        </TotalAmountContainer>
      )}
      {!currentUserID && (
        <LoginMistakeContainer>
          <h4>Oops!</h4> <p> You are not logged in</p>
          <Link to="/login">login</Link>
        </LoginMistakeContainer>
      )}
    </PageWrapper>
  )
}

export default Cart
