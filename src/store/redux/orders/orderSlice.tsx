import { createAppSlice } from "store/createAppSlice"
import { OrderSliceState } from "./types"
import axiosConfig from "../../../../axiosConfig"

const orderInitialState: OrderSliceState = {
  currentOrder: undefined,
  orders: [],
  error: undefined,
  isPending: false,
}

export const orderSlice = createAppSlice({
  name: "ORDER",
  initialState: orderInitialState,
  reducers: create => ({
    createOrder: create.asyncThunk(
      async (payload: any) => {
        const response = await axiosConfig.post(`/api/orders`, {
          address: payload.address,
          deliveryTime: payload.deliveryTime,
          paymentMethod: payload.paymentMethod,
        })
        return response.data
      },
      {
        pending: (state: OrderSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OrderSliceState, action) => {},
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    getOrders: create.asyncThunk(
      async () => {
        const response = await axiosConfig.get(`/api/orders/my`)
        return response.data
      },
      {
        pending: (state: OrderSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OrderSliceState, action) => {},
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    getOrdersAdmin: create.asyncThunk(
      async () => {
        const response = await axiosConfig.get(`/api/orders`)
        return response.data
      },
      {
        pending: (state: OrderSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OrderSliceState, action) => {},
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    updateOrder: create.asyncThunk(
      async (payload: any) => {
        const response = await axiosConfig.put(
          `/api/orders/${payload.orderId}`,
          {
            orderStatus: payload.orderStatus,
          },
        )
        return response.data
      },
      {
        pending: (state: OrderSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OrderSliceState, action) => {},
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
  }),
  selectors: {
    ordersState: (state: OrderSliceState) => state,
  },
})

export const ordersAction = orderSlice.actions
export const ordersSelector = orderSlice.selectors
