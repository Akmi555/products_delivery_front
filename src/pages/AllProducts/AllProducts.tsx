import { PageWrapper } from "./styles"
import ProductCard from "components/ProductCard/ProductCard"

// импорт для работы слайса 
import {useAppDispatch, useAppSelector } from "store/hooks"
import {productsAction, productsSelectors} from "store/redux/allProducts/allProductsSlice"

function AllProducts() {
// забираем значение из стора 
// const allProducts = useAppSelector(productsSelectors.) - тут дописать надо сначала в слайсе логику 

// сохраняем функцию dispatch которую возвращает вызов хука useAppDispatch
const dispatch = useAppDispatch();

// если есть функции которые что то меняют (у насх их нет) , если это надо то см конец урока 15 с Катей 2 часа 45 минут примерно 



  return (
    <PageWrapper>
      <ProductCard img="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/1200px-Table_grapes_on_white.jpg" 
      name="Grapes" weight={300} price={1.65}/>
    </PageWrapper>
  )
}

export default AllProducts
