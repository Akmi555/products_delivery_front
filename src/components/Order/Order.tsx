import { getNormalDateAndTimeFromOrderObject } from "pages/AllOrdersAdmin/AllOrdersAdmin"
import { DataContainer, OrderWrapper } from "./styles"
import { orderObjDataProps } from "./types"

function Order({ orderObjData }: orderObjDataProps) {
  return (
    <OrderWrapper>
      <DataContainer>
        {getNormalDateAndTimeFromOrderObject(orderObjData.orderTime)}
      </DataContainer>
      <DataContainer> {orderObjData.address}</DataContainer>
      <DataContainer>
        {getNormalDateAndTimeFromOrderObject(orderObjData.deliveryTime)}
      </DataContainer>
      <DataContainer> {orderObjData.totalSum}</DataContainer>
      <DataContainer> {orderObjData.orderStatus}</DataContainer>
    </OrderWrapper>
  )
}

export default Order
