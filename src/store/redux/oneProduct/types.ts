export interface OneProductSliceState {
  currentProduct: OneProductObject | undefined
  error: string | undefined
  isPending: boolean
}

export interface OneProductObject {
  id: number
  title: string
  price: number
  productCode: string
  minQuantity: string
  description: string
  photoLink: string | undefined
}
