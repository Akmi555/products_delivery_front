import { useEffect, useState } from "react"
import { v4 } from "uuid"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { ProductObject } from "store/redux/allProducts/types"
import {
  productsAction,
  productsSelectors,
} from "store/redux/allProducts/allProductsSlice"

import ProductCard from "components/ProductCard/ProductCard"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"

import { Container, Pagination, Stack, Tooltip } from "@mui/material"

import {
  CategoriesWrapper,
  Category,
  GoBackButtonWrapper,
  PageWrapper,
  PaginatorWrapper,
  ProductCardsWrapper,
} from "./styles"

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
      <CategoriesWrapper>
        <Tooltip title="DAIRY">
          <Category>&#129472; &#129371;</Category>
        </Tooltip>
        <Tooltip title="MEAT">
          <Category>&#129385; &#127831;</Category>
        </Tooltip>
        <Tooltip title="BEVERAGES">
          <Category>&#127866; &#127870;</Category>
        </Tooltip>
        <Tooltip title="VEGETABLES & FRUITS">
          <Category>&#129382; &#127822;</Category>
        </Tooltip>
        <Tooltip title="BAKERY">
          <Category>&#127838; &#129360;</Category>
        </Tooltip>
        <Tooltip title="SEAFOOD">
          <Category>&#129424; &#129425;</Category>
        </Tooltip>
        <Tooltip title="SNACKS & SWEETS">
          <Category>&#127851; &#127871; </Category>
        </Tooltip>
        <Tooltip title="GRAINS">
          <Category>&#127834; </Category>
        </Tooltip>
        <Tooltip title="FROZEN">
          <Category>&#129482;</Category>
        </Tooltip>
      </CategoriesWrapper>
      <ProductCardsWrapper>
        {products.map((productObj: ProductObject) => (
          <ProductCard key={v4()} productData={productObj} />
        ))}
      </ProductCardsWrapper>
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
      <GoBackButtonWrapper>
        <ScrollUpArrowButton />
      </GoBackButtonWrapper>
    </PageWrapper>
  )
}

export default AllProducts
