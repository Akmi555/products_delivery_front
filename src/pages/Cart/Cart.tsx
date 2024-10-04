import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"

function Cart() {

  // получение айди залогиненного пользователя
  const { currentUser }  = useAppSelector(userAuthSelectors.userAuthState)
  const currentUserID: number | undefined = currentUser?.id

  

  const dispatch = useAppDispatch()
  dispatch(cartActions.showCart(currentUserID))


  const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)

// МАПинг
// const cartsAllProducts = 


  return <></>
}

export default Cart
