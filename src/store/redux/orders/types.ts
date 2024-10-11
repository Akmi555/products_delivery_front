export interface OrderSliceState {
  currentOrder: orderObject | undefined
  orders: orderObject[]
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
  paymentMethod: PaymentMethod
  totalSum: number
}

export interface orderProduct {
  orderId: number
  productId: number
  productQuantity: number
  productSum: number
}

export enum OrderStatus {
  CREDIT_CARD,
  PAYPAL,
  BANK_TRANSFER,
}

export enum PaymentMethod {
  PENDING, //ожидает оплаты или подтверждения.
  PAID, //  оплачен.
  PROCESSING, //в процессе обработки.
  SHIPPED, // отправлен.
  DELIVERED, // доставлен клиенту.
  CANCELLED, // отменён.
  REFUNDED, // средства за заказ возвращены.
}
