import {
  PageWrapper,
  ProductDescription,
  ProductDescriptionName,
  ProductDescriptionWrapper,
} from "./styles"
import { ProductObject } from "store/redux/allProducts/types"

function OneProduct() {
  const productExample: ProductObject = {
    id: 1,
    title: "Milk",
    price: 1.5,
    minQuantity: "1l",
    photoLink:
      "https://rskrf.ru/upload/iblock/1a3/jfs0j9ivsls0sij9u77x13lc134keuwb.jpg",
  }

  return (
    <PageWrapper>
      // ! создать новый компонент карты 
      <ProductDescriptionWrapper>
        <ProductDescriptionName>{}</ProductDescriptionName>
        <ProductDescription></ProductDescription>
      </ProductDescriptionWrapper>
    </PageWrapper>
  )
}

export default OneProduct
