import { createAppSlice } from "store/createAppSlice"
import { CartSliceState, ChangeProductAmountData } from "./types"
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
      async (productId: number) => {
        const response = await axios.post(`/api/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
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
        const response: any = await axios.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
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
    // clearCartLogOut: create.reducer(() => cartInitialState),
    logOut: create.reducer((state: CartSliceState) => {
      state.allProductsFromCart = []
      state.currentProductFromCart = undefined
      state.error = undefined
      state.isPending = false
    }),
    changeAmountInCart: create.asyncThunk(
      async (data: ChangeProductAmountData) => {
        const response = await axios.put(
          `/api/cart/${data.productId}/${data.newAmount}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        )
        return response.data
      },
      {
        pending: (state: CartSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: CartSliceState, action) => {
          state.isPending = false
          state.currentProductFromCart = action.payload
          if (
            state.allProductsFromCart.some(
              product => product.productId === action.payload.productId,
            )
          ) {
            state.allProductsFromCart = state.allProductsFromCart.map(p =>
              p.productId === action.payload.productId ? action.payload : p,
            )
          }
        },
        rejected: (state: CartSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    deleteProductFromCart: create.asyncThunk(
      async (productId: number) => {
        const response = await axios.delete(`api/cart/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        return response.data
      },
      {
        pending: (state: CartSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: CartSliceState, action) => {
          state.isPending = false
          state.allProductsFromCart = state.allProductsFromCart.filter(
            p => p.productId !== action.payload.productId,
          )
        },
        rejected: (state: CartSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    deleteCart: create.asyncThunk(
      async () => {
        const response = await axios.delete("api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        return response.data
      },
      {
        pending: (state: CartSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: CartSliceState) => {
          state.isPending = false
          state.allProductsFromCart = []
        },
        rejected: (state: CartSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
  }),
  selectors: {
    cartState: (state: CartSliceState) => state,
  },
})

export const cartActions = cartSlice.actions
export const cartSelectors = cartSlice.selectors
