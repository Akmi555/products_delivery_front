import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { allProductsSlice } from "./redux/allProducts/allProductsSlice"
import { userAuthSlice } from "./redux/users/userAuthSlice"
import { oneProductSlice } from "./redux/oneProduct/oneProductSlice"
import { cartSlice } from "./redux/cart/cartSlice"
import { allUsersSlice } from "./redux/allUsers/allUsersSlice"
import { orderSlice } from "./redux/order/orderSlice"

// сюда добавляются слайсы через запятую
const rootReducer = combineSlices(
  allProductsSlice,
  oneProductSlice,
  userAuthSlice,
  cartSlice,
  allUsersSlice,
  orderSlice,
)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  })
  return store
}

export const store = makeStore()

export type AppStore = typeof store

export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
