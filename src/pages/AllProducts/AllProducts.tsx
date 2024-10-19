import { useEffect, useState } from "react"
import { v4 } from "uuid"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { ProductCotegories, ProductObject } from "store/redux/allProducts/types"
import {
  allProductsSlice,
  productsAction,
  productsSelectors,
} from "store/redux/allProducts/allProductsSlice"

import ProductCard from "components/ProductCard/ProductCard"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"
import CategoryButton from "components/CategoryButton/CategoryButton"

import { Container, Pagination, Stack } from "@mui/material"

import {
  CategoriesWrapper,
  GoBackButtonWrapper,
  PageWrapper,
  PaginatorWrapper,
  ProductCardsWrapper,
} from "./styles"
import { colors } from "styles/colors"

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
    setCategory("ALL_PRODUCTS")
  }, [currentPage, pageQuantity])

  const [category, setCategory] = useState<string>("")

  const getProductsByCategory = (category: string) => {
    setCategory(category)
    dispatch(
      allProductsSlice.actions.getCategoryProducts({
        currentPage: currentPage,
        pageSize: pageSize,
        category: category,
      }),
    )
  }

  return (
    <PageWrapper>
      <CategoriesWrapper>
        <CategoryButton
          name="All products"
          color={
            category === "ALL_PRODUCTS"
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            setCategory("ALL_PRODUCTS")
            dispatch(
              productsAction.getProducts({
                currentPage: currentPage,
                pageSize: pageSize,
              }),
            )
          }}
        />
        <CategoryButton
          name="Dairy"
          color={
            category === ProductCotegories.DAIRY
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.DAIRY)
          }}
        />
        <CategoryButton
          name="Meat"
          color={
            category === ProductCotegories.MEAT
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.MEAT)
          }}
        />
        <CategoryButton
          name="Beverages"
          color={
            category === ProductCotegories.BEVERAGES
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.BEVERAGES)
          }}
        />
        <CategoryButton
          name="Vegetables fruits"
          color={
            category === ProductCotegories.VEGETABLES_FRUITS
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.VEGETABLES_FRUITS)
          }}
        />
        <CategoryButton
          name="Bakery"
          color={
            category === ProductCotegories.BAKERY
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.BAKERY)
          }}
        />
        <CategoryButton
          name="Seafood"
          color={
            category === ProductCotegories.SEAFOOD
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.SEAFOOD)
          }}
        />
        <CategoryButton
          name="Snacks sweets"
          color={
            category === ProductCotegories.SNACKS_SWEETS
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.SNACKS_SWEETS)
          }}
        />
        <CategoryButton
          name="Grains"
          color={
            category === ProductCotegories.GRAINS
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.GRAINS)
          }}
        />
        <CategoryButton
          name="Frozen"
          color={
            category === ProductCotegories.FROZEN
              ? `${colors.MAIN_GREEN}`
              : "gray"
          }
          onClick={() => {
            getProductsByCategory(ProductCotegories.FROZEN)
          }}
        />
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
