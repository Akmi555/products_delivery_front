import { useAppSelector } from "store/hooks"
import { cartSelectors } from "store/redux/cart/cartSlice"

function Cart() {

const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)

  // const cartComponents = 

  return <></>
}

export default Cart
