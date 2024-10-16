import { OrderAndProductData } from "components/Order/types"

export interface ProductFromOrderProps {
  orderProduct: OrderAndProductData
}

// мне приходит это
// export interface orderObject {
//     id: number
//     userId: number
//     orderTime: string
//     address: string
//     deliveryTime: string
//     orderProducts: orderProduct[]
//     orderStatus: OrderStatus
//     paymentMethod: string
//     totalSum: number
//   }

// из orderProducts я достаю вот такой объект:
// export interface orderProduct {
//     orderId: number
//     productId: number
//     productQuantity: number
//     productSum: number
//   }

// и его мне надо соединить с продуктом
// export interface OneProductObject {
//     id: number
//     title: string
//     price: number
//     productCode: string
//     minQuantity: string
//     description: string
//     photoLink: string | undefined
//   }
