import { createAppSlice } from "store/createAppSlice"
import { CartSliceState, AddToCartData, CartItemObject } from "./types"
import axios from "axios"

const cartInitialState: CartSliceState = {
  currentProductFromCart: undefined,
  allProductsFromCart: [],
  error: undefined,
  isPending: false,
}

export const cartSlice = createAppSlice({
  name: "CART",
  initialState: cartInitialState,
  reducers: create => ({
    addProductToCart: create.asyncThunk(
      async (payload: AddToCartData) => {
        const response = await axios.post(
          `/api/cart/${payload.userId}/${payload.productId}`,
        )
        return response.data
      },
      {
        pending: () => {},
        fulfilled: () => {},
        rejected: () => {},
      },
    ),
    showCart: create.asyncThunk(
      async (state: CartItemObject) => {
        const response = await axios.get(`/api/cart/${state.cartId}`)
        return response.data
      },
      {
        pending: () => {},
        fulfilled: () => {},
        rejected: () => {},
      },
    ),
    deleteProductFromCart: create.asyncThunk(
      async (state: AddToCartData) => {
        const response = await axios.delete(``)
        return response.data
      },
      {
        pending: () => {},
        fulfilled: () => {},
        rejected: () => {},
      },
    ),
  }),
  // селекторы, которые дают забирать данные из хранилища в какой то компонент
  selectors: {
    cartState: (state: CartSliceState) => {
      state
    },
  },
})

export const cartActions = cartSlice.actions
export const cartSelectors = cartSlice.selectors
