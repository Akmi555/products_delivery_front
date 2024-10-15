import { FormikErrors } from "formik"
import { ReactNode } from "react"

export interface OrderSliceState {
  currentOrder: orderObject | undefined
  orders: orderObject[]
  ordersAdmin: orderObject[]
  error: string | undefined
  isPending: boolean
}

export interface orderObject {
  id: number
  userId: number
  orderTime: string
  address: string
  deliveryTime: string
  productList: orderProduct[]
  orderStatus: OrderStatus
  paymentMethod: string
  totalSum: number
}

export interface confirmOrder {
  id: number
  address: string
  deliveryTime: Date
  paymentMethod: string
}

export interface orderProduct {
  orderId: number
  productId: number
  productQuantity: number
  productSum: number
}

export enum PaymentMethod {
  CREDIT_CARD,
  PAYPAL,
  BANK_TRANSFER,
}

export enum OrderStatus {
  PENDING, //ожидает оплаты или подтверждения.
  PAID, //  оплачен.
  PROCESSING, //в процессе обработки.
  SHIPPED, // отправлен.
  DELIVERED, // доставлен клиенту.
  CANCELLED, // отменён.
  REFUNDED, // средства за заказ возвращены.
}
