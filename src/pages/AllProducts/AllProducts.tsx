import Button from "components/Button/Button"
import { ButtonContainer, PageWrapper } from "./styles"
import cartWhite from "assets/shopping-cart-white.png"
import ProductCard from "components/ProductCard/ProductCard"

function AllProducts() {
  return (
    <PageWrapper>
      <ProductCard img="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/1200px-Table_grapes_on_white.jpg" 
      name="Grapes" weight={300} price={1.65}/>
    </PageWrapper>
  )
}

export default AllProducts
