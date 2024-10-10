export interface CartSliceState {
  currentProductFromCart: CartItemObject | undefined
  allProductsFromCart: CartItemObject[]
  error: string | undefined
  isPending: boolean
}

export interface CartItemObject {
  id: number
  cartId: number
  productId: number
  productQuantity: number
  sum: number
}

// export interface AddToCartData {
//   userId: number | undefined
//   productId: number | undefined
//   accessToken: string | undefined
// }

export interface ShowCartData {
  userId: number | undefined
  accessToken: string | undefined
}