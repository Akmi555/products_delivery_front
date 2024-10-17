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

// для snackbar
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"

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

  // const cancelOrderData: updateOrder = {
  //   orderId: orderObject.id,
  //   orderStatus: "CANCELLED",
  // }
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

  // для оплаты заказа который в статусе pending
  const addOrderData = () => {
    // тут положить данные этого ордера в currentOrder
    navigate("/order-form")
  }

  // для окошка при отмене заказа
  const [openCanselWindow, setOpenCanselWindow] = useState(false)

  const handleClickOpen = () => {
    setOpenCanselWindow(true)
  }

  const handleCanselOrder = async () => {
    setOpenCanselWindow(false)
    const dispatchResult = await dispatch(
      orderAction.cancelOrder(orderObject.id),
    )
    if (orderAction.cancelOrder.fulfilled.match(dispatchResult)) {
      // dispatch(orderAction.getOrders())
      // ! ЭТО НЕ РАБОТАЕТ, openSnackbar все равно остается FALSE
      setOpenSnackbar(true)
      // console.log(openSnackbar)

      // а вот так почему то работает
      // const handleClick = () => {
      //   setOpenSnackbar(true)
      // }
    }
  }

  const handleClose = () => {
    setOpenCanselWindow(false)
  }

  // для snackbar
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)

  const handleClick = () => {
    setOpenSnackbar(true)
  }

  const handleCloseSnackbar = (
    event: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpenSnackbar(false)
  }

  useEffect(() => {
    console.log("lalala")
  }, [openSnackbar])

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
        <AccordionDetails>{ordersAllProducts}</AccordionDetails>
        <AccordionActions>
          {/* <ButtonMain buttonName="Cancel order" onClick={canselOrder} /> */}

          {/* окошко при отмене заказа*/}
          <Fragment>
            {String(orderObject.orderStatus) !== "CANCELLED" && (
              <ButtonMain buttonName="Cancel order" onClick={handleClickOpen} />
            )}

            <Dialog
              open={openCanselWindow}
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
                  onClick={handleCanselOrder}
                >
                  Cansel order
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>

          {String(orderObject.orderStatus) === "PENDING" && (
            // <ButtonMain buttonName="Pay order" onClick={}></ButtonMain>
            // <ButtonMain
            //   buttonName="Pay"
            //   onClick={payPendingOrder}
            // />
            <ButtonMain
              buttonName="Proceed to checkout"
              onClick={addOrderData}
            />
          )}

          {/* snackbar */}
          {/* <div> */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={5000}
              // onClose={handleCloseSnackbar}
              message={`Order with id:${orderObject.id} was cancelled`}
            />
          {/* </div> */}
        </AccordionActions>
      </Accordion>
    </OrderWrapper2>
  )
}

export default Order
