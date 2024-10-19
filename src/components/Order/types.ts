import { OrderObject } from "store/redux/order/types"
import { colors } from "styles/colors"

export interface OrderObjDataProps {
  orderObject: OrderObject
}

export interface OrderAndProductData {
  id: number
  title: string
  price: number
  productCode: string
  minQuantity: string
  description: string
  photoLink: string | undefined
  productQuantity: number
  sum: number
}


export const OrderStatusColors = {
  PENDING: "", //ожидает оплаты или подтверждения.
  PAID: `${colors.MAIN_GREEN}`, //  оплачен.
  PROCESSING: "", //в процессе обработки.
  SHIPPED: "", // отправлен.
  DELIVERED: "", // доставлен клиенту.
  CANCELLED: `${colors.BACKGROUND_GRAY}`, // отменён.
  REFUNDED: "", // средства за заказ возвращены.
}