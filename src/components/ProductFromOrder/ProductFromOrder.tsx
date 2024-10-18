import { useNavigate } from "react-router-dom"

import ProductButton from "components/ProductButton/ProductButton"

import { DataContainer, ImgContainer, ProductFromOrderWrapper } from "./styles"
import { ProductFromOrderProps } from "./types"

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
