import CartComponent from "components/CartComponent/CartComponent"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"

import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { v4 } from "uuid"
import { CartItemsWrapper, PageWrapper } from "./styles"
import { useEffect, useState } from "react"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { CartAndProductData } from "./types"
import { OneProductObject } from "store/redux/oneProduct/types"

function Cart() {
  const [products, setProducts] = useState<OneProductObject[]>([])
  const dispatch = useAppDispatch()

  // получение айди залогиненного пользователя для отображения корзины (запрос находится в useEffect ниже)
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const currentUserID: number | undefined = currentUser?.id

  // получение доступа к стейте со всеми продуктами ИЗ КОРЗИНЫ
  const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)

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
    </PageWrapper>
  )
}

export default Cart
