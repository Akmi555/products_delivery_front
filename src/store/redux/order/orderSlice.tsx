import { createAppSlice } from "store/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit"

import { OrderSliceState, ConfirmOrder, OrderObject } from "./types"
import axios from "axios"

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
        const response = await axios.post(
          `/api/order`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
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
          state.isPending = false
          state.currentOrder = action.payload
          // и еще надо очищать корзину , вызвать метод на странице где это происходит через диспатч
        },
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    confirmOrder: create.asyncThunk(
      async (payload: ConfirmOrder) => {
        const response = await axios.put(
          `/api/order/confirmed`,
          {
            id: payload.id,
            address: payload.address,
            deliveryTime: payload.deliveryTime,
            paymentMethod: payload.paymentMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
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
          state.isPending = false
          if (state.currentOrder) {
            state.currentOrder.address = action.payload.address
            state.currentOrder.deliveryTime = action.payload.deliveryTime
            state.currentOrder.orderStatus = action.payload.orderStatus
            state.currentOrder.paymentMethod = action.payload.paymentMethod
          }
          if (action.payload.payment_url) {
            window.location.href = action.payload.payment_url
          }
        },
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    payForOrder: create.asyncThunk(
      async (payload: any) => {
        const response = await axios.put(`/api/order/paid/${payload.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
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
            state.currentOrder.orderStatus = action.payload.orderStatus
          }
          if (action.payload.payment_url) {
            window.location.href = action.payload.payment_url
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
        const response = await axios.get(`/api/order/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
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
        const response = await axios.get(`/api/order`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
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
    putToCurrentOrder: create.reducer(
      (state: OrderSliceState, action: PayloadAction<OrderObject>) => {
        state.currentOrder = action.payload
      },
    ),
    cancelOrder: create.asyncThunk(
      async (orderId: number) => {
        const response = await axios.put(`/api/order/${orderId}/cancel`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
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
          if (state.orders.some(o => o.id === action.payload.id)) {
            state.orders = state.orders.map(o =>
              o.id === action.payload.productId
                ? action.payload.orderStatus
                : o,
            )
          }
        },
        rejected: (state: OrderSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    logOut: create.reducer((state: OrderSliceState) => {
      state.currentOrder = undefined
      state.error = undefined
      state.isPending = false
      state.orders = []
      state.ordersAdmin = []
    }),
  }),
  selectors: {
    orderState: (state: OrderSliceState) => state,
  },
})

export const orderAction = orderSlice.actions
export const orderSelector = orderSlice.selectors
