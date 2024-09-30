import { createAppSlice } from "store/createAppSlice"
import { ProductSliceState } from "./types"
import { create } from "domain"
import axios from "axios"

const addProductInitialState: ProductSliceState = {
  currentProduct: undefined,
  error: undefined,
  isPending: false,
}

export const addProductSlice = createAppSlice({
  name: "PRODUCT",
  initialState: addProductInitialState,
  reducers: create => ({
    addProduct: create.asyncThunk(
      async (payload: any) => {
        const response = await axios.post(
          `
        //! ПРОПИСАТЬ ПУТЬ ЗАПРОСА 
        `,
          {
            title: payload.title,
            price: payload.price,
            productCode: payload.productCode,
            minQuantity: payload.minQuantity,
            description: payload.description,
            photoLink: payload.photoLink,
          },
          {
            headers: {},
          },
        )
        return response.data
      },
      { pending: () => {}, 
        fulfilled: () => {}, 
        rejected: () => {} 
      },
    ),
  }),
  selectors: {
    productState: (state: ProductSliceState) => state,
  },
})
