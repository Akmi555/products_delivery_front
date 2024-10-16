import { ProductFromOrderProps } from "./types"
import { DataContainer, ProductFromOrderWrapper, ProductImg } from "./styles"

function ProductFromOrder({ orderProduct }: ProductFromOrderProps) {
  return (
    <ProductFromOrderWrapper>
      <DataContainer>
        <ProductImg src={`/api/files/download/${orderProduct.photoLink}`} />
      </DataContainer>
      <DataContainer>
        <p>{orderProduct.title}</p>
      </DataContainer>
      <DataContainer>
        <p>Quantity:  {orderProduct.productQuantity}</p>
      </DataContainer>
      <DataContainer>
        <p>Sum:  {orderProduct.sum}</p>
      </DataContainer>
    </ProductFromOrderWrapper>
  )
}

export default ProductFromOrder
