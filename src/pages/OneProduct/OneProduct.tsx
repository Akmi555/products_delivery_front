import {
  oneProductAction,
  oneProductSelectors,
} from "store/redux/oneProduct/oneProductSlice"
import { GoBackButtonWrapper, PageWrapper } from "./styles"
import { useAppDispatch, useAppSelector } from "store/hooks"
import ProductDetailsCard from "components/OneProductCard/OneProductCard"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"

function OneProduct() {
  const dispatch = useAppDispatch()
  const { currentProduct } = useAppSelector(oneProductSelectors.productState)
  const { id } = useParams()

  useEffect(() => {
    dispatch(oneProductAction.openProduct(Number(id)))
  }, [id])

  return (
    <PageWrapper>
      <GoBackButtonWrapper>
        <GoBackArrowButton />
      </GoBackButtonWrapper>
      {currentProduct && <ProductDetailsCard productData={currentProduct} />}
      <div></div>
    </PageWrapper>
  )
}

export default OneProduct
