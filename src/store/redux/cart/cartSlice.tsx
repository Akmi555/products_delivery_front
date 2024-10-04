import { createAppSlice } from "store/createAppSlice"
import { CartSliceState, AddToCartData } from "./types"
import axios from "axios"
import { stat } from "fs"

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
        fulfilled: (state: CartSliceState, action) => {
          state.currentProductFromCart = action.payload
          // console.log(action.payload)
        },
        rejected: () => {},
      },
    ),
    showCart: create.asyncThunk(
      async (userId: number | undefined) => {
        const response = await axios.get(`/api/cart/${userId}`)
        return response.data
      },
      {
        pending: (state: CartSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: CartSliceState, action) => {
          state.isPending = false
          // state.allProductsFromCart = action.payload
          state.allProductsFromCart = action.payload.data
        },
        rejected: (state: CartSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    // deleteProductFromCart: create.asyncThunk(
    //   async () => {
    //     const response = await axios.delete(``)
    //     return response
    //   },
    //   {
    //     pending: () => {},
    //     fulfilled: () => {},
    //     rejected: () => {},
    //   },
    // ),
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
