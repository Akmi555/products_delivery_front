import {
  oneProductAction,
  oneProductSelectors,
} from "store/redux/oneProduct/oneProductSlice"
import { PageWrapper } from "./styles"
import { useAppDispatch, useAppSelector } from "store/hooks"
import ProductDetailsCard from "components/OneProductCard/OneProductCard"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function OneProduct() {
  const dispatch = useAppDispatch()
  const { currentProduct } = useAppSelector(oneProductSelectors.productState)
  const { id } = useParams()

  useEffect(() => {
    dispatch(oneProductAction.openProduct(Number(id)))
  }, [id])

  return (
    <PageWrapper>
      {currentProduct && <ProductDetailsCard productData={currentProduct} />}
    </PageWrapper>
  )
}

export default OneProduct
