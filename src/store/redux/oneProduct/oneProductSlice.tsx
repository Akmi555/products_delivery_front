import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import axiosConfig from "../../../../axiosConfig"

import { AddDBObject, OneProductSliceState } from "./types"

const oneProductInitialState: OneProductSliceState = {
  currentProduct: undefined,
  error: undefined,
  isPending: false,
}

export const oneProductSlice = createAppSlice({
  name: "PRODUCT",
  initialState: oneProductInitialState,
  reducers: create => ({
    openProduct: create.asyncThunk(
      async (productId: number | undefined) => {
        const response = await axios.get(`/api/products/${productId}`)
        return response.data
      },
      {
        pending: (state: OneProductSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OneProductSliceState, action) => {
          state.isPending = false
          state.currentProduct = action.payload
        },
        rejected: (state: OneProductSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    addProductToDB: create.asyncThunk(
      async (payload: AddDBObject) => {
        const response = await axiosConfig.post(
          `/api/products`,
          {
            title: payload.title,
            price: payload.price,
            productCode: payload.productCode,
            minQuantity: payload.minQuantity,
            description: payload.description,
            photoLink: payload.photoLink,
          },
          {
            headers: { "Content-Type": "application/json" },
          },
        )
        return response.data
      },
      { pending: () => {}, fulfilled: () => {}, rejected: () => {} },
    ),
    deleteProductFromDB: create.asyncThunk(
      async (productId: number | undefined) => {
        const response = await axiosConfig.delete(`/api/products/${productId}`)
        return response.data
      },
      {
        pending: (state: OneProductSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OneProductSliceState, action) => {
          state.isPending = false
          state.currentProduct = undefined
        },
        rejected: (state: OneProductSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
  }),
  selectors: {
    productState: (state: OneProductSliceState) => state,
  },
})

export const oneProductAction = oneProductSlice.actions
export const oneProductSelectors = oneProductSlice.selectors
