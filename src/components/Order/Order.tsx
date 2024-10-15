import { DataContainer, OrderWrapper } from "./styles"
import { orderObjDataProps } from "./types"

function Order({ orderObjData }: orderObjDataProps) {
  const orderTime: string = orderObjData.orderTime
  const year: number = Number(orderTime.slice(0, 4))
  const month: number = Number(orderTime.slice(5, 7))
  const day: number = Number(orderTime.slice(8, 10))
  const hours: number = Number(orderTime.slice(11, 13))
  const minutes: number = Number(orderTime.slice(14, 16))

  const deliveryTime: string = String(orderObjData.deliveryTime)
  const yearDeliveryTime: number = Number(deliveryTime.slice(0, 4))
  const monthDeliveryTime: number = Number(deliveryTime.slice(5, 7))
  const dayDeliveryTime: number = Number(deliveryTime.slice(8, 10))
  const hoursDeliveryTime: number = Number(deliveryTime.slice(11, 13))
  const minutesDeliveryTime: number = Number(deliveryTime.slice(14, 16))

  return (
    <OrderWrapper>
      <DataContainer> {day}.{month}.{year} {hours}: {minutes}</DataContainer>
      <DataContainer> {orderObjData.address}</DataContainer>
      <DataContainer> {dayDeliveryTime}.{monthDeliveryTime}.{yearDeliveryTime} {hoursDeliveryTime}: {minutesDeliveryTime}</DataContainer>
      <DataContainer> {orderObjData.totalSum}</DataContainer>
      <DataContainer> {orderObjData.orderStatus}</DataContainer>
    </OrderWrapper>
  )
}

export default Order
