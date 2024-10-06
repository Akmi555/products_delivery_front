import { oneProductSelectors } from "store/redux/oneProduct/oneProductSlice"
import { PageWrapper } from "./styles"
import { useAppSelector } from "store/hooks"
import ProductDetailsCard from "components/OneProductCard/OneProductCard"

function OneProduct() {
  const { currentProduct } = useAppSelector(
    oneProductSelectors.productState,
  )

  return (
    <PageWrapper>
      {currentProduct && <ProductDetailsCard productData={currentProduct} />}
    </PageWrapper>
  )
}

export default OneProduct
