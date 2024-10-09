export interface ProductsSliceState {
  currentProduct: ProductObject | undefined
  products: ProductObject[]
  totalPages: number
  error: string | undefined
  isPending: boolean
}

export interface ProductObject {
  id: number
  title: string
  price: number
  minQuantity: string
  photoLink: string
}

export interface CartObject {
  userId : number | undefined
  productId: number 
}
