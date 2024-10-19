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
import CategoryButton from "components/CategoryButton/CategoryButton"

import {Container, Pagination, Stack } from "@mui/material"

import {
  CategoriesWrapper,
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
        <CategoryButton name="Dairy" onClick={() => {}} />
        <CategoryButton name="Meat" onClick={() => {}} />
        <CategoryButton name="Beverages" onClick={() => {}} />
        <CategoryButton name="Vegetables & fruits" onClick={() => {}} />
        <CategoryButton name="Bakery" onClick={() => {}} />
        <CategoryButton name="Seafood" onClick={() => {}} />
        <CategoryButton name="Snacks & sweets" onClick={() => {}} />
        <CategoryButton name="Grains" onClick={() => {}} />
        <CategoryButton name="Frozen" onClick={() => {}} />
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
