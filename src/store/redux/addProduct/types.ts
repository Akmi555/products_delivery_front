export interface ProductSliceState {
    currentProduct: ProductObject | undefined
    // accessToken: string | undefined
    error: string | undefined
    isPending: boolean
  }

export interface ProductObject {
    title: string
    price: number
    productCode: string
    minQuantity: string
    description: string
    photoLink: string
  }