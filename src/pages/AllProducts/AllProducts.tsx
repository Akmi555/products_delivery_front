import { useEffect, useState } from "react"
import { PageWrapper, PaginatorWrapper, ProductCardsWrapper } from "./styles"
import ProductCard from "components/ProductCard/ProductCard"
// импорт для работы слайса
import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  productsAction,
  productsSelectors,
} from "store/redux/allProducts/allProductsSlice"

import { ProductObject } from "store/redux/allProducts/types"
import { v4 } from "uuid"
import { Container, Pagination, Stack } from "@mui/material"

function AllProducts() {
  // забираем значение из стора
  // const allProducts = useAppSelector(productsSelectors.productsState)

  // сохраняем функцию dispatch которую возвращает вызов хука useAppDispatch
  const dispatch = useAppDispatch()

  // для пагинации:
  const [currentPage, setCurrentPage] = useState<number>(1)
  // ! ТУТ СТАВИТСЯ КОЛ-ВО ПРОДУКТОВ НА СТРАНИЦЕ
  const [pageSize] = useState<number>(20)
  const [pageQuantity, setPageQuantity] = useState<number>(1)

  const { products, totalPages } = useAppSelector(
    productsSelectors.productsState,
  )
  const productCards = products.map((productObj: ProductObject) => (
    <ProductCard key={v4()} productData={productObj} />
  ))

  // если есть функции которые что то меняют (у насх их нет) , если это надо то см конец урока 15 с Катей 2 часа 45 минут примерно

  // const { currentProduct, error } = useAppSelector(
  //   productsSelectors.productsState,
  // )

  // const [isModalOpen, setModalOpen] = useState<boolean>(false)
  // const [errorMessage, setErrorMessage] = useState("")

  // const dispatch = useAppDispatch()
  // const getAllProducts= () => {
  //   dispatch(productsAction.addProductToCart(productData.productData))
  //   // ТУТ МОЖНО ДОБАВИТЬ АЛЕРТ ИЛИ ДРУГОЕ ПОДТВЕРЖДЕНИЕ ЧТО ДЕЙСТВИЕ ПРОШЛО УСПЕШНО
  // }

  // useEffect(() => {
  //   if (error) {
  //     setModalOpen(true)
  //     setErrorMessage(error)
  //   }
  // }, [error])

  const handleChange = (_: any, value: number) => {
    setCurrentPage(value)
    setPageQuantity(totalPages)
  }

  useEffect(() => {
    dispatch(
      productsAction.getProducts({
        currentPage: currentPage,
        pageSize: pageSize,
      }),
    )
    // .then((res)=>{setPageQuantity(res.payload.data.content.totalPages)})
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
