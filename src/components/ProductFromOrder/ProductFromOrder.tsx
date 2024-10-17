import { ProductFromOrderProps } from "./types"
import { DataContainer, ImgContainer, ProductFromOrderWrapper, ProductImg } from "./styles"
import ProductButton from "components/ProductButton/ProductButton"
import { useNavigate } from "react-router-dom"

function ProductFromOrder({ orderProduct }: ProductFromOrderProps) {
  const navigate = useNavigate()
  const openCurrentProduct = () => {
    navigate(`/${orderProduct.id}`)
  }
  
  return (
    <ProductFromOrderWrapper>
      <DataContainer>
        <ImgContainer>
          <ProductButton
          onClick={openCurrentProduct}
            imgSrc={`/api/files/download/${orderProduct.photoLink}`}
          />
          {/* <ProductImg src={`/api/files/download/${orderProduct.photoLink}`} /> */}
        </ImgContainer>
      </DataContainer>
      <DataContainer>
        <p>{orderProduct.title}</p>
      </DataContainer>
      <DataContainer>
        <p>Quantity: {orderProduct.productQuantity}</p>
      </DataContainer>
      <DataContainer>
        <p>Sum: {orderProduct.sum}</p>
      </DataContainer>
    </ProductFromOrderWrapper>
  )
}

export default ProductFromOrder
