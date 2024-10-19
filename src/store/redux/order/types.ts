export interface OrderSliceState {
  currentOrder: OrderObject | undefined
  orders: OrderObject[]
  ordersAdmin: OrderObject[]
  error: string | undefined
  isPending: boolean
}

export interface OrderObject {
  id: number
  userId: number
  orderTime: string
  address: string
  deliveryTime: string
  orderProducts: OrderProduct[]
  orderStatus: OrderStatus
  paymentMethod: string
  totalSum: number
  paymentUrl: string
}

export interface ConfirmOrder {
  id: number
  address: string
  deliveryTime: string | Date
  paymentMethod: string
}

export interface UpdateOrder {
  orderId: number
  orderStatus: OrderStatus
}

export interface OrderProduct {
  orderId: number
  productId: number
  productQuantity: number
  sum: number
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
