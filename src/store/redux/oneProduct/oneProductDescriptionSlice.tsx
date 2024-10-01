// здесь будет : как должны храниться данные, как они должны обрабатываться,
// что есть initial state, как это все потом передать в компонент
// в этом файле главная настройка store, которая касается отображения списка всех продуктов

// стор - отвечает за данные всего приложения и в нем есть слайсы-кусочки которые отвечают за какие то отдельные части программы
// эту логику надо разделять чтобы не путаться в куче данных

// после создания слайса идем в store.ts и там в combineSlices через запятую добавляем новые слайсы

import axios from "axios"
import { createAppSlice } from "store/createAppSlice"
import { ProductDescriptionObject, ProductDescriptionSliceState } from "./types"
import { PayloadAction } from "@reduxjs/toolkit"

//начальное значение ВСЕГДА объект
const productDescriptionInitialState: ProductDescriptionSliceState = {
  currentProduct: undefined,
  error: undefined,
  isPending: false,
}

// похоже на формик. Вызываем функцию и передаем туда все настройки
export const oneProductDescriptionSlice = createAppSlice({
  name: "PRODUCT",
  initialState: productDescriptionInitialState,
  // объект со всеми редьюсерами
  reducers: create => ({
    openProduct: create.asyncThunk(
      async (productId: number) => {
        const response = await axios.get(`/api/products/${productId}`)
        return response
      },
      {
        pending: (state: ProductDescriptionSliceState) => {
          state.error = undefined
          state.isPending = true
        },
        fulfilled: (state: ProductDescriptionSliceState, action) => {
          state.isPending = false
          state.currentProduct = action.payload.data
        },
        rejected: (state: ProductDescriptionSliceState, action) => {
          state.error = action.error.message
          state.isPending = false
        },
      },
    ),
    // ! реализовать логику добавления в корзину
    addProductToCart: create.reducer(
      (state: ProductDescriptionSliceState, action: PayloadAction<number>) => {
        state.currentProduct = undefined
        // state.products = state.products.filter((productCard: ProductInfoObject) => {
        //   return productCard.id !== action.payload
        // })
      },
    ),
    addProductToDB: create.asyncThunk(
      async (payload: ProductDescriptionObject) => {
        const response = await axios.post(
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
            headers: { "Content-Type": "application/json",},
          },
        )
        return response.data
      },
      { pending: () => {}, fulfilled: () => {}, rejected: () => {} },
    ),
  }),
  // селекторы, которые дают забирать данные из хранилища в какой то компонент
  selectors: {
    productState: (state: ProductDescriptionSliceState) => state,
  },
})

// экспорт экшенов и селекторов чтобы чтобы можно было воспользоваться ими в компонентах приложения
export const productDescriptionAction = oneProductDescriptionSlice.actions
export const productDescriptionSelectors = oneProductDescriptionSlice.selectors

// все остальные действия внутри компонента
