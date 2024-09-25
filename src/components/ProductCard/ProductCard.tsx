import {
  ButtonContainer,
  ImgProduct,
  PriceButtonContainer,
  ProductName,
  ProductPrice,
  ProductWeight,
  ProductWrapper,
} from "./styles"
import Button from "components/Button/Button"
import cartWhite from "assets/shopping-cart-white.png"
import { useDispatch } from "react-redux"
import { ProductDataProps } from "./types"
import { productsAction } from "store/redux/allProducts/allProductsSlice"

function ProductCard(productData: ProductDataProps) {

  // const dispatch = useDispatch()
  const photoLink: string = productData.productData.photoLink
  const title: string = productData.productData.title
  const minQuantity: number = productData.productData.minQuantity
  const price: number = productData.productData.price
 
  // const onAddToCart= () => {
  //   dispatch(productsAction.addProductToCart(productData.productData.id))
  //   // ТУТ МОЖНО ДОБАВИТЬ АЛЕРТ ИЛИ ДРУГОЕ ПОДТВЕРЖДЕНИЕ ЧТО ДЕЙСТВИЕ ПРОШЛО УСПЕШНО 
  // }

  return (
    <ProductWrapper>
      <ImgProduct src={photoLink} />
      <ProductName>{title}</ProductName>
      <ProductWeight>{minQuantity}</ProductWeight>
      <PriceButtonContainer>
        <ProductPrice>{price} €</ProductPrice>
        <ButtonContainer>
          <Button imgSrc={cartWhite} type="button"/>
        </ButtonContainer>
      </PriceButtonContainer>
    </ProductWrapper>
  )
}

export default ProductCard
