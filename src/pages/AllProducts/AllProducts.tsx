import { useEffect, useState } from "react"
import { PageWrapper, PaginatorWrapper, ProductCardsWrapper } from "./styles"
import ProductCard from "components/ProductCard/ProductCard"
import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  productsAction,
  productsSelectors,
} from "store/redux/allProducts/allProductsSlice"

import { ProductObject } from "store/redux/allProducts/types"
import { v4 } from "uuid"
import { Container, Pagination, Stack } from "@mui/material"

function AllProducts() {
  const dispatch = useAppDispatch()

  // для пагинации:
  const [currentPage, setCurrentPage] = useState<number>(1)
  // ! ТУТ СТАВИТСЯ КОЛ-ВО ПРОДУКТОВ НА СТРАНИЦЕ
  const [pageSize] = useState<number>(20)
  const [pageQuantity, setPageQuantity] = useState<number>(1)
  // в аппСелектор добавили общее кол-во страниц для пагинатора
  const { products, totalPages } = useAppSelector(
    productsSelectors.productsState,
  )
 
  // МАПинг
  const productCards = products.map((productObj: ProductObject) => (
    <ProductCard key={v4()} productData={productObj} />
  ))

  // пагинация
  const handleChange = (_: any, value: number) => {
    setCurrentPage(value)
    setPageQuantity(totalPages)
  }
  // и тут добавили для пагинации, до этого был вызов при маунтинге
  useEffect(() => {
    dispatch(
      productsAction.getProducts({
        currentPage: currentPage,
        pageSize: pageSize,
      }),
    )
  }, [currentPage, pageQuantity])

  return (
    <PageWrapper>
      <ProductCardsWrapper>{productCards}</ProductCardsWrapper>
      <Container>
        <PaginatorWrapper>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChange}
            />
          </Stack>
        </PaginatorWrapper>
      </Container>
    </PageWrapper>
  )
}

export default AllProducts
