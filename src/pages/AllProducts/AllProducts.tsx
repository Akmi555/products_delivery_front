import ProductCard from "components/ProductCard/ProductCard"
import { useEffect } from "react"

function AllProducts() {
  useEffect(() => {
    //ТУТ ЗАПРОС НА ПОЛУЧЕНИЕ ДАННЫХ О ПРОДУКТАХ
  }, [])

  return (
    <>
      <ProductCard
        img="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/1200px-Table_grapes_on_white.jpg"
        name="Grapes"
        weight={300}
        price={1.56}
      />
    </>
  )
}

export default AllProducts
