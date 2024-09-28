import { productDescriptionSelectors } from "store/redux/oneProduct/oneProductDescriptionSlice"
import { PageWrapper } from "./styles"
import { useAppSelector } from "store/hooks"
import ProductDetailsCard from "components/ProductDetailsCard/ProductDetailsCard"

function OneProduct() {
  const { currentProduct } = useAppSelector(
    productDescriptionSelectors.productState,
  )

  return (
    <PageWrapper>
      {currentProduct && <ProductDetailsCard productData={currentProduct} />}
    </PageWrapper>
  )
}

export default OneProduct
