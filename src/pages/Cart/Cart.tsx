import CartComponent from "components/CartComponent/CartComponent"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"
import { CartItemObject } from "store/redux/cart/types"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { v4 } from "uuid"
import { CartItemsWrapper, PageWrapper } from "./styles"
import { useEffect } from "react"

function Cart() {
  const dispatch = useAppDispatch()

  // получение айди залогиненного пользователя для отображения корзины
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const currentUserID: number | undefined = currentUser?.id

  const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)

  console.log (allProductsFromCart)
  // МАПинг
  const cartsAllProducts = allProductsFromCart.map(
    (cartItemObject: CartItemObject) => (
      <CartComponent key={v4()} cartObjData={cartItemObject} />
    ),
  )

  if (currentUserID) {
    // вызов функции при открытии корзины
    useEffect(() => {
      dispatch(cartActions.showCart(currentUserID))
      
    }, [])
  } else {
    console.log ("user is not logged in")
  }

  return (
    <PageWrapper>
      <CartItemsWrapper>
        {cartsAllProducts}
        {/* <CartComponent/> */}
      </CartItemsWrapper>
    </PageWrapper>
  )
}

export default Cart
