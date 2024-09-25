import { ProductObject } from "store/redux/allProducts/types"

// export interface ProductCardProps {
//   img?: string
//   name?: string
//   weight?: string
//   price?: number
// }

export interface ProductCardProps {
  productData: ProductObject
  isSinglePageProduct?: boolean | undefined
}
