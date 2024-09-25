// здесь будет : как должны храниться данные, как они должны обрабатываться,
// что есть initial state, как это все потом передать в компонент
// в этом файле главная настройка store, которая касается отображения списка всех продуктов

// стор - отвечает за данные всего приложения и в нем есть слайсы-кусочки которые отвечают за какие то отдельные части программы
// эту логику надо разделять чтобы не путаться в куче данных

// после создания слайса идем в store.ts и там в combineSlices через запятую добавляем новые слайсы

import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import { ProductObject, ProductsSliceState } from "./types"
import { PayloadAction, isPending } from "@reduxjs/toolkit"
import { v4 } from "uuid"

//начальное значение ВСЕГДА объект
const productsInitialState: ProductsSliceState = {
  currentProduct: undefined,
  products: [],
  error: undefined,
  isPending: false,
}

// похоже на формик. Вызываем функцию и передаем туда все настройки
export const allProductsSlice = createAppSlice({
  // имя под которым будет храниться бъект со значениями всех продуктов в глобальном стейте
  name: "PRODUCTS",
  //изначальное состояние
  initialState: productsInitialState,
  // объект со всеми редьюсерами
  reducers: create => ({
    getProducts: create.asyncThunk(
      async () => {
        const response = await axios.get("/api/products")
        return response
      },
      {
        pending: (state: ProductsSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: ProductsSliceState, action) => {
          // console.log("Fulfilled")
          // const id = v4()
          // console.log(products)

          // const id = action.payload.data.products[0].id
          // const title = action.payload.data.products[0].title
          // const price = action.payload.data.products[0].price
          // const minQuantity = action.payload.data.products[0].minQuantity
          // const photoLink = action.payload.data.products[0].photoLink
          state.isPending = false
          state.products = action.payload.data
        },
        rejected: (state: ProductsSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    addProductToCart: create.reducer(
      (state: ProductsSliceState, action: PayloadAction<number>) => {
        state.currentProduct = undefined
        state.products = state.products.filter((productCard: ProductObject) => {
          return productCard.id !== action.payload
        })
        // state.products = [...state.products, action.payload]
      },
    ),
  }),
  // селекторы, которые дают забирать данные из хранилища в какой то компонент
  selectors: {
    productsState: (state: ProductsSliceState) => state,
  },
})

// экспорт экшенов и селекторов чтобы чтобы можно было воспользоваться ими в компонентах приложения
export const productsAction = allProductsSlice.actions
export const productsSelectors = allProductsSlice.selectors

// все остальные действия внутри компонента
