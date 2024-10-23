import { Link } from "react-router-dom"
import { useEffect } from "react"
import { v4 } from "uuid"

import { orderAction, orderSelector } from "store/redux/order/orderSlice"
import { useAppDispatch, useAppSelector } from "store/hooks"

import UserCard from "components/UserCard/UserCard"
import Order from "components/Order/Order"
import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"
import ProgressCircle from "components/ProgressCircle/ProgressCircle"

import { LoginMistakeContainer } from "pages/Cart/styles"
import {
  GoBackButtonUserCardWrapper,
  GoBackButtonWrapper,
  OrderTitles,
  OrdersContainer,
  PageWrapper,
  ScrollUpButtonWrapper,
  TitleOrder,
  UseProfileWrapper,
} from "./styles"

function UserProfile() {
  const dispatch = useAppDispatch()
  const { orders, isPending } = useAppSelector(orderSelector.orderState)

  const userOrders = orders.map(order => (
    <Order key={v4()} orderObject={order} />
  ))

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(orderAction.getOrders())
    }
  }, [])

  return (
    <PageWrapper>
      {!localStorage.getItem("accessToken") && (
        <LoginMistakeContainer>
          <h4>Oops! &#x1F625;</h4> <p> You are not logged in</p>
          <Link to="/login" style={{ color: "green" }}>
            login &#128072;
          </Link>
          <Link to="/registration" style={{ color: "green" }}>
            or register
          </Link>
        </LoginMistakeContainer>
      )}
      {localStorage.getItem("accessToken") && (
        <UseProfileWrapper>
          <GoBackButtonUserCardWrapper>
            <GoBackButtonWrapper>
              <GoBackArrowButton />
            </GoBackButtonWrapper>
            <UserCard />
          </GoBackButtonUserCardWrapper>

          <OrdersContainer>
            {userOrders.length > 0 && (
              <>
                <h2 style={{ paddingLeft: "16px" }}>Orders</h2>
                <OrderTitles>
                  <TitleOrder>Date of order </TitleOrder>
                  <TitleOrder>Adress </TitleOrder>
                  <TitleOrder>Delivery time</TitleOrder>
                  <TitleOrder>Amount € </TitleOrder>
                  <TitleOrder>Order status</TitleOrder>
                </OrderTitles>
              </>
            )}

            {isPending ? <ProgressCircle /> : <>{userOrders}</>}
          </OrdersContainer>

          {orders && (
            <ScrollUpButtonWrapper>
              <ScrollUpArrowButton />
            </ScrollUpButtonWrapper>
          )}
        </UseProfileWrapper>
      )}
    </PageWrapper>
  )
}

export default UserProfile
