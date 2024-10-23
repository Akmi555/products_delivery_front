import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { v4 } from "uuid"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { OneProductObject } from "store/redux/oneProduct/types"
import { orderAction } from "store/redux/order/orderSlice"

import ButtonMain from "components/ButtonMain/ButtonMain"
import CartComponent from "components/CartComponent/CartComponent"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"
import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"

import { IconButton, Stack, Tooltip } from "@mui/material"
import { GridDeleteIcon } from "@mui/x-data-grid"

import {
  Amount,
  CartItemsWrapper,
  PageWrapper,
  TotalAmountContainer,
  Text,
  PriceContainer,
  LoginMistakeContainer,
  GoBackButtonWrapper,
  ScrollUpButtonWrapper,
  EmptyCartMessageWrapper,
} from "./styles"
import { CartAndProductData } from "./types"
import ProgressCircle from "components/ProgressCircle/ProgressCircle"
import { ToastContainer, toast } from "react-toastify"

function Cart() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [products, setProducts] = useState<OneProductObject[]>([])
  const { allProductsFromCart, isPending, error } = useAppSelector(
    cartSelectors.cartState,
  )
  let totalAmount: number = 0
  let totalQuantity: number = 0
  const accessToken: string | null = localStorage.getItem("accessToken")
  const notifyDeleteCartRejected = () =>
    toast.error(error, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  const notifyDeleteCartFulfilled = () =>
    toast.success("Cart is empty now", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })

  for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
    totalAmount += allProductsFromCart[i].sum
  }
  for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
    totalQuantity += allProductsFromCart[i].productQuantity
  }

  // соединили products и allProductsFromCart в один объект и один массив
  const cartAndProductDat: CartAndProductData[] = products
    .map(product => {
      const cartItem = allProductsFromCart.find(
        item => item.productId === product.id,
      )
      return {
        ...product,
        productQuantity: cartItem ? cartItem.productQuantity : 0,
        sum: cartItem ? cartItem.sum : 0,
      }
    })
    .filter(item => item.productQuantity > 0)

  // проверка на залогиненного пользователя
  if (accessToken) {
    useEffect(() => {
      // положили в стейт массив из элементов корзины
      dispatch(cartActions.openCart())

      // вытащили в массив айди тех продуктов, которые в корзине
      const productIds = allProductsFromCart.map(item => item.productId)

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

  const clearCart = async () => {
    const dispatchResult = await dispatch(cartActions.deleteCart())
    if (cartActions.deleteCart.fulfilled.match(dispatchResult)) {
      notifyDeleteCartFulfilled()
    }

    if (cartActions.deleteCart.rejected.match(dispatchResult)) {
      notifyDeleteCartRejected()
    }
  }

  const createOrder = async () => {
    const dispatchResult = await dispatch(orderAction.createOrder())

    if (orderAction.createOrder.fulfilled.match(dispatchResult)) {
      dispatch(cartActions.deleteCart())
      navigate("/order-form")
    }
  }

  return (
    <PageWrapper>
      {isPending ? (
        <ProgressCircle />
      ) : (
        <>
          {accessToken && (
            <GoBackButtonWrapper>
              <GoBackArrowButton />
            </GoBackButtonWrapper>
          )}
          <CartItemsWrapper>
            {allProductsFromCart.length >= 1 && (
              <Stack direction="row" spacing={1}>
                <Tooltip title="Clear all cart">
                  <IconButton aria-label="delete" onClick={clearCart}>
                    <GridDeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
            {cartAndProductDat.map((obj: CartAndProductData) => (
              <CartComponent key={v4()} cartObjData={obj} />
            ))}
            <ToastContainer />
          </CartItemsWrapper>
          {allProductsFromCart.length >= 1 && (
            <TotalAmountContainer>
              <PriceContainer>
                <Text>Subtotal ({totalQuantity} items):</Text>
                <Amount> € {totalAmount.toFixed(2)} </Amount>
              </PriceContainer>

              {allProductsFromCart.length >= 1 && totalAmount >= 10 && (
                <ButtonMain
                  buttonName="Proceed to checkout"
                  onClick={createOrder}
                />
              )}

              {totalAmount < 10 && (
                <>
                  <ButtonMain
                    disabled
                    buttonName="Proceed to checkout"
                    onClick={createOrder}
                  />
                  <p
                    style={{
                      color: "red",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Min order amount is 10 €
                  </p>
                </>
              )}
            </TotalAmountContainer>
          )}
          {allProductsFromCart.length >= 1 && (
            <ScrollUpButtonWrapper>
              <ScrollUpArrowButton />
            </ScrollUpButtonWrapper>
          )}
          {allProductsFromCart.length === 0 && accessToken && (
            <EmptyCartMessageWrapper>
              <p> Your cart is empty &#128577;</p>
              <ButtonMain
                buttonName="Go shopping"
                onClick={() => navigate("/")}
              ></ButtonMain>
            </EmptyCartMessageWrapper>
          )}
          {!accessToken && (
            <LoginMistakeContainer>
              <h4>Oops! &#x1F625; </h4> <p> You are not logged in</p>
              <Link style={{ color: "green" }} to="/login">
                login &#128072;
              </Link>
              <Link style={{ color: "green" }} to="/registration">
                or register
              </Link>
            </LoginMistakeContainer>
          )}
        </>
      )}
    </PageWrapper>
  )
}

export default Cart
