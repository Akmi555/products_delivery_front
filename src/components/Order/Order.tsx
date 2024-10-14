import { DataContainer, OrderWrapper } from "./styles"
import { orderObjDataProps } from "./types"

function Order({ orderObjData }: orderObjDataProps) {
  const data: string = orderObjData.orderTime
  const year: number = Number(data.slice(0, 4))
  const month: number = Number(data.slice(5, 7))
  const day: number = Number(data.slice(8, 10))
  const hours: number = Number(data.slice(11, 13))
  const minutes: number = Number(data.slice(14, 16))

  return (
    <OrderWrapper>
      <DataContainer> {day}.{month}.{year} {hours}: {minutes}</DataContainer>
      <DataContainer> {orderObjData.address}</DataContainer>
      <DataContainer> {orderObjData.deliveryTime}</DataContainer>
      <DataContainer> {orderObjData.totalSum}</DataContainer>
      <DataContainer> {orderObjData.orderStatus}</DataContainer>
    </OrderWrapper>
  )
}

export default Order
