import { createAppSlice } from "store/createAppSlice"
import { CartSliceState } from "./types"
import axiosConfig from "../../../../axiosConfig"

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
      async (productId: number) => {
        const response = await axiosConfig.post(`/api/cart/${productId}`)
        return response.data
      },
      {
        pending: (state: CartSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: CartSliceState, action) => {
          state.currentProductFromCart = action.payload
          // ! сделать более быстрым способом (методами или for)
          if (
            state.allProductsFromCart.some(
              product => product.productId === action.payload.productId,
            )
          ) {
            state.allProductsFromCart = state.allProductsFromCart.map(p =>
              p.productId === action.payload.productId ? action.payload : p,
            )
          } else {
            state.allProductsFromCart.push(action.payload)
          }
        },
        rejected: (state: CartSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    openCart: create.asyncThunk(
      async () => {
        const response: any = await axiosConfig.get("/api/cart")
        return response.data
      },
      {
        pending: (state: CartSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: CartSliceState, action) => {
          state.isPending = false
          state.allProductsFromCart = action.payload
        },
        rejected: (state: CartSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    clearCartLogOut: create.reducer(() => cartInitialState),
  }),
  selectors: {
    cartState: (state: CartSliceState) => state,
  },
})

export const cartActions = cartSlice.actions
export const cartSelectors = cartSlice.selectors
