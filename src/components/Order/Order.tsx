import { getNormalDateAndTimeFromOrderObject } from "pages/AllOrdersAdmin/AllOrdersAdmin"
import {
  DataContainer,
  DataWrapper,
  OrderWrapper,
  OrderWrapper2,
} from "./styles"
import { OrderAndProductData, orderObjDataProps } from "./types"
// для раскрывающегося списка
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"
import ProductFromOrder from "components/ProductFromOrder/ProductFromOrder"
import { orderProduct } from "store/redux/order/types"
import { v4 } from "uuid"
import { Children, useEffect, useState } from "react"
import { useAppDispatch } from "store/hooks"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { OneProductObject } from "store/redux/oneProduct/types"
import { ProductFromOrderProps } from "components/ProductFromOrder/types"
import { colors } from "styles/colors"

function Order({ orderObject }: orderObjDataProps) {
  const dispatch = useAppDispatch()
  const [products, setProducts] = useState<OneProductObject[]>([])

  // orderObject - это сам заказ, внутри есть массив из orderProduct
  const orderProductArray: orderProduct[] = orderObject.orderProducts

  // проверка на залогиненного пользователя
  if (localStorage.getItem("accessToken")) {
    useEffect(() => {
      // вытащили в массив айди тех продуктов, которые в ЗАКАЗЕ
      const productIds = orderProductArray.map(item => item.productId)

      // достаем данные о продуктах (сложная логика)
      const fetchProducts = async () => {
        try {
          const productDataPromises = productIds.map(productId =>
            dispatch(oneProductAction.openProduct(productId)),
          )
          const productsData = await Promise.all(productDataPromises)
          const productsDataPayload = productsData.map(item => item.payload)
          setProducts(productsDataPayload)
        } catch (e) {
          console.error("Error fetching products:", e)
        }
      }
      fetchProducts()
    }, [])
  }

  // объединение массивов и заказов
  const orderAndProductDat: OrderAndProductData[] = products
    .map(product => {
      const cartItem = orderProductArray.find(
        item => item.productId === product.id,
      )
      // тут добавляем к данным объекта товара данные о заказе 
      return {
        ...product,
        productQuantity: cartItem ? cartItem.productQuantity : 0,
        sum: cartItem ? cartItem.sum : 0,
      }
    })
    .filter(item => item.productQuantity > 0)

  //отображение элементов корзины
  const ordersAllProducts = orderAndProductDat.map(
    (obj: OrderAndProductData) => (
      <ProductFromOrder key={v4()} orderProduct={obj} />
    ),
  )

  return (
    <OrderWrapper2>
      <Accordion sx={{ borderRadius: 50 }}>
        <AccordionSummary sx={{backgroundColor: "#82d982", }} aria-controls="panel1-content" id="panel1-header">
          <DataWrapper>
            <DataContainer>
              {getNormalDateAndTimeFromOrderObject(orderObject.orderTime)}
            </DataContainer>
            <DataContainer> {orderObject.address}</DataContainer>
            <DataContainer>
              {getNormalDateAndTimeFromOrderObject(orderObject.deliveryTime)}
            </DataContainer>
            <DataContainer> {orderObject.totalSum}</DataContainer>
            <DataContainer> {orderObject.orderStatus}</DataContainer>
          </DataWrapper>
        </AccordionSummary>
        <AccordionDetails>{ordersAllProducts}</AccordionDetails>
      </Accordion>
    </OrderWrapper2>
  )
}

export default Order
