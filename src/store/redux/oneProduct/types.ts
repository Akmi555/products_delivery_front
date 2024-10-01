export interface ProductDescriptionSliceState {
  currentProduct: ProductDescriptionObject | undefined
  error: string | undefined
  isPending: boolean
}

export interface ProductDescriptionObject {
  id?: number
  title: string
  price: number
  productCode: string
  minQuantity: string
  description: string
  photoLink: string | undefined
}
