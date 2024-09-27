import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { allProductsSlice } from "./redux/allProducts/allProductsSlice"
import { userAuthSlice } from "./redux/users/userAuthSlice"
import { oneProductDescriptionSlice } from "./redux/oneProduct/oneProductDescriptionSlice"

// сюда добавляются слайсы через запятую
const rootReducer = combineSlices(allProductsSlice, oneProductDescriptionSlice, userAuthSlice)

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