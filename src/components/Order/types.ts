import { OrderObject } from "store/redux/order/types";


export interface orderObjDataProps {
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