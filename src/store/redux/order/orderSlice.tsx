import { createAppSlice } from "store/createAppSlice"
import { OrderSliceState, confirmOrder, orderObject } from "./types"
import axiosConfig from "../../../../axiosConfig"

const orderInitialState: OrderSliceState = {
  currentOrder: undefined,
  orders: [],
  ordersAdmin: [],
  error: undefined,
  isPending: false,
}

export const orderSlice = createAppSlice({
  name: "ORDERS",
  initialState: orderInitialState,
  reducers: create => ({
    createOrder: create.asyncThunk(
      async () => {
        const response = await axiosConfig.post(`/api/order`)
        return response.data
      },
      {
        pending: (state: OrderSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OrderSliceState, action) => {
          state.isPending = false
          state.currentOrder = action.payload
          // очищать корзину , вызвать на странице где это происходит через диспатч
        },
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    confirmOrder: create.asyncThunk(
      async (payload: confirmOrder ) => {
        const response = await axiosConfig.put(`/api/order/confirmed`, {
          id: payload.id,
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
        fulfilled: (state: OrderSliceState, action) => {
          state.isPending = false
          if (state.currentOrder) {
            state.currentOrder.address = action.payload.address
            state.currentOrder.deliveryTime = action.payload.deliveryTime
            state.currentOrder.orderStatus = action.payload.orderStatus
            state.currentOrder.paymentMethod = action.payload.paymentMethod
          }

        },
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    getOrders: create.asyncThunk(
      async () => {
        const response = await axiosConfig.get(`/api/order/my`)
        return response.data
      },
      {
        pending: (state: OrderSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OrderSliceState, action) => {
          state.orders = action.payload
          state.isPending = false
        },
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    getOrdersAdmin: create.asyncThunk(
      async () => {
        const response = await axiosConfig.get(`/api/order`)
        return response.data
      },
      {
        pending: (state: OrderSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: OrderSliceState, action) => {
          state.ordersAdmin = action.payload
          state.isPending = false
        },
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
        fulfilled: (state: OrderSliceState, action) => {
          state.currentOrder = action.payload
          state.isPending = false
        },
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
  }),
  selectors: {
    orderState: (state: OrderSliceState) => state,
  },
})

export const orderAction = orderSlice.actions
export const orderSelector = orderSlice.selectors
