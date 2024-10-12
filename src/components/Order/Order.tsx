import { OrderWrapper } from "./styles"
import { orderObjDataProps } from "./types"

function Order({ orderObjData }: orderObjDataProps) {
  return (
    <OrderWrapper>
      <div> {orderObjData.orderTime}</div>
      <div> {orderObjData.address}</div>
      <div> {orderObjData.deliveryTime}</div>
      <div> {orderObjData.totalSum}</div>
      <div> {orderObjData.orderStatus}</div>
    </OrderWrapper>
  )
}

export default Order
