export interface PATHS {
  MAIN: string
  CART: string
  USER_PROFILE: string
  ONE_PRODUCT_CARD: string
  REGISTRATION: string
  LOGIN: string
  ADD_PRODUCT: string
  ALL_USERS: string
}

export const paths: PATHS = {
  MAIN: "/",
  CART: " /cart",
  USER_PROFILE: "/userProfile",
  ONE_PRODUCT_CARD: " /oneProductCard",
  REGISTRATION: "/registration",
  LOGIN: " /login",
  ADD_PRODUCT: "/addProduct",
  ALL_USERS: "/allUsers",
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
