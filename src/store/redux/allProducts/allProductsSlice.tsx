import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import { CartObject, ProductsSliceState } from "./types"

const productsInitialState: ProductsSliceState = {
  currentProduct: undefined,
  products: [],
  totalPages: 3,
  error: undefined,
  isPending: false,
}

export const allProductsSlice = createAppSlice({
  name: "PRODUCTS",
  initialState: productsInitialState,
  reducers: create => ({
    getProducts: create.asyncThunk(
      // !!!!
      async (payload: any) => {
        const response = await axios.get(
          `/api/products/page?page=${payload.currentPage - 1}&size=${payload.pageSize}`,
          {
            // код ниже помог решить ошибку в консоли
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        return response.data
      },
      {
        pending: (state: ProductsSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: ProductsSliceState, action) => {
          state.isPending = false
          state.products = action.payload.content
          //!!!!
          state.totalPages = action.payload.totalPages
        },
        rejected: (state: ProductsSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    addProductToCart: create.asyncThunk(
      async (state: CartObject) => {
        const response = await axios.post(
          `/api/cart/${state.userId}/${state.productId}`,
        )
        return response.data
      },
      {
        pending: () => {},
        fulfilled: () => {},
        rejected: () => {},
      },
    ),

    openProduct: create.asyncThunk(
      async (productId: number) => {
        const response = await axios.get(`/api/products/${productId}`)
        return response.data
      },
      {
        pending: (state: ProductsSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: ProductsSliceState, action) => {
          state.isPending = false
          state.currentProduct = action.payload.data
        },
        rejected: (state: ProductsSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
  }),
  selectors: {
    productsState: (state: ProductsSliceState) => state,
  },
})

export const productsAction = allProductsSlice.actions
export const productsSelectors = allProductsSlice.selectors
