import { useEffect } from "react"
import { useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  oneProductAction,
  oneProductSelectors,
} from "store/redux/oneProduct/oneProductSlice"

import ProductDetailsCard from "components/OneProductCard/OneProductCard"
import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"
import ProgressCircle from "components/ProgressCircle/ProgressCircle"

import { GoBackButtonWrapper, PageWrapper } from "./styles"


function OneProduct() {
  const dispatch = useAppDispatch()
  const { currentProduct, isPending } = useAppSelector(
    oneProductSelectors.productState,
  )
  const { id } = useParams()

  useEffect(() => {
    dispatch(oneProductAction.openProduct(Number(id)))
  }, [id])

  return (
    <PageWrapper>
      <GoBackButtonWrapper>
        <GoBackArrowButton />
      </GoBackButtonWrapper>

      {isPending ? (
        <ProgressCircle />
      ) : (
        <>
          {currentProduct && (
            <ProductDetailsCard productData={currentProduct} />
          )}
        </>
      )}
      <div></div>
    </PageWrapper>
  )
}

export default OneProduct
