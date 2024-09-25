import { useEffect } from "react"
import { PageWrapper } from "./styles"
import ProductCard from "components/ProductCard/ProductCard"
// импорт для работы слайса 
import {useAppDispatch, useAppSelector } from "store/hooks"
import {productsAction, productsSelectors} from "store/redux/allProducts/allProductsSlice"

import { ProductObject } from "store/redux/allProducts/types"

function AllProducts() {
// забираем значение из стора 
// const allProducts = useAppSelector(productsSelectors.productsState) 

// сохраняем функцию dispatch которую возвращает вызов хука useAppDispatch
const dispatch = useAppDispatch();


const { products } = useAppSelector(productsSelectors.productsState)
const productCards = products.map((productObj : ProductObject)=>(
  <ProductCard productData={productObj} isSinglePageProduct/>
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

useEffect(() => {
  dispatch(productsAction.getProducts())
}, [])

  return (
    <PageWrapper>
      {productCards}
      {/* {currentProduct && ( 
        <ProductCard productData={currentProduct} isSaved={false}/>
      )} */}
    </PageWrapper>
  )
}

export default AllProducts
