import { getNormalDateAndTimeFromOrderObject } from "pages/AllOrdersAdmin/AllOrdersAdmin"
import { DataContainer, DataWrapper, OrderWrapper2 } from "./styles"
import { OrderAndProductData, orderObjDataProps } from "./types"

// для раскрывающегося списка
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ProductFromOrder from "components/ProductFromOrder/ProductFromOrder"

// для окошка при отмене заказа
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"

import { OrderStatus, orderProduct } from "store/redux/order/types"
import { v4 } from "uuid"
import {
  Fragment,
  ReactElement,
  Ref,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useState,
} from "react"
import { useAppDispatch } from "store/hooks"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { OneProductObject } from "store/redux/oneProduct/types"
import { colors } from "styles/colors"
import ButtonMain from "components/ButtonMain/ButtonMain"
import { orderAction } from "store/redux/order/orderSlice"
import { cartActions } from "store/redux/cart/cartSlice"
import { useNavigate } from "react-router-dom"

// для окошка при отмене заказа
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

function Order({ orderObject }: orderObjDataProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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

  // для оплаты заказа который в статусе pending
  const addOrderData = () => {
    dispatch(orderAction.putToCurrentOrder(orderObject))
    navigate("/order-form")
  }

  // для окошка при отмене заказа
  const [openCancelWindow, setOpenCanselWindow] = useState(false)

  const handleClickOpen = () => {
    setOpenCanselWindow(true)
  }

  const handleCancelOrder = async () => {
    setOpenCanselWindow(false)
    const dispatchResult = await dispatch(
      orderAction.cancelOrder(orderObject.id),
    )
    if (orderAction.cancelOrder.fulfilled.match(dispatchResult)) {
      dispatch(orderAction.getOrders())
    }
  }

  const handleClose = () => {
    setOpenCanselWindow(false)
  }
  return (
    <OrderWrapper2>
      <Accordion sx={{ borderRadius: 50 }}>
        <AccordionSummary
          sx={{ borderBottom: `4px solid ${colors.MAIN_GREEN}` }}
          aria-controls="panel1-content"
          id="panel1-header"
        >
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
        {/* отображение элементов корзины */}
        <AccordionDetails>
          {orderAndProductDat.map((obj: OrderAndProductData) => (
            <ProductFromOrder key={v4()} orderProduct={obj} />
          ))}
        </AccordionDetails>
        <AccordionActions>
          {/* окошко при отмене заказа*/}
          <Fragment>
            {String(orderObject.orderStatus) !== "CANCELLED" && (
              <ButtonMain buttonName="Cancel order" onClick={handleClickOpen} />
            )}

            <Dialog
              open={openCancelWindow}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Are you sure you want to cancel your order? "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  This action cannot be undone, please confirm
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close window</Button>
                <Button
                  sx={{ color: "rgb(255, 0, 0)" }}
                  onClick={handleCancelOrder}
                >
                  Cancel order
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>

          {String(orderObject.orderStatus) === "PENDING" && (
            <ButtonMain
              buttonName="Proceed to checkout"
              onClick={addOrderData}
            />
          )}
        </AccordionActions>
      </Accordion>
    </OrderWrapper2>
  )
}

export default Order
