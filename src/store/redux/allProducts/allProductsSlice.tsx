// здесь будет : как должны храниться данные, как они должны обрабатываться,
// что есть initial state, как это все потом передать в компонент
// в этом файле главная настройка store, которая касается отображения списка всех продуктов

// стор - отвечает за данные всего приложения и в нем есть слайсы-кусочки которые отвечают за какие то отдельные части программы
// эту логику надо разделять чтобы не путаться в куче данных

// после создания слайса идем в store.ts и там в combineSlices через запятую добавляем новые слайсы

import axios from "axios"
import { createAppSlice } from "store/createAppSlice"

//начальное значение ВСЕГДА объект
const allProductsInitialState = {
    // тут надо описать объект или же надо массив объектов сделать ??? 
    "id": 0,
    "title": "",
    "price": 0,
    "productCode": "",
    "minQuantity": "",
    "description": "",
    "photoLink": null
}

// пример из приложения погоды 
// const appWeatherInitialState: WeatherAppSliceState = {
//     currentWeatherData: undefined,
//     weather: [],
//     error: undefined,
//     isPending: false,
//   }

// похоже на формик. Вызываем функцию и передаем туда все настройки
export const allProductsSlice = createAppSlice({
  // имя под которым будет храниться бъект со значениями всех продуктов в глобальном стейте
  name: "All_PRODUCTS",
  //изначальное состояние
  initialState: allProductsInitialState,
  // объект со всеми редьюсерами 
  reducers: create => ({
getAllProducts: create.asyncThunk(
    async () => {
        const response = await axios.get (
            "localhost:8080/api/products"
        )
        return response
    }
)
  }),
  // селекторы, которые дают забирать данные из хранилища в какой то компонент 
  selectors: {
  }
})

// экспорт экшенов и селекторов чтобы чтобы можно было воспользоваться ими в компонентах приложения 
export const productsAction = allProductsSlice.actions
export const productsSelectors = allProductsSlice.selectors
// все остальные действия внутри компонента 