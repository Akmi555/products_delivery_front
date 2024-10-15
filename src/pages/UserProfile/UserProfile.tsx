import { useAppDispatch, useAppSelector } from "store/hooks"
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
import { LoginMistakeContainer } from "pages/Cart/styles"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import UserCard from "components/UserCard/UserCard"
import { orderAction, orderSelector } from "store/redux/order/orderSlice"
import Order from "components/Order/Order"
import { v4 } from "uuid"
import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"


function UserProfile() {
  // получение айди залогиненного пользователя для отображения корзины (запрос находится в useEffect ниже)
  // const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const { orders } = useAppSelector(orderSelector.orderState)

  const dispatch = useAppDispatch()

  const userOrders = orders.map(order => (
    <Order key={v4()} orderObjData={order} />
  ))

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(orderAction.getOrders())
      // dispatch(userAuthAction.getUser())
    }
  }, [])

  console.log(orders)
  return (
    <PageWrapper>
      {!localStorage.getItem("accessToken") && (
        <LoginMistakeContainer>
          <h4>Oops!</h4> <p> You are not logged in</p>
          <Link to="/login">login</Link>
        </LoginMistakeContainer>
      )}
      {localStorage.getItem("accessToken") && (
        <UseProfileWrapper>

          <GoBackButtonUserCardWrapper>
          <GoBackButtonWrapper>
            <GoBackArrowButton/>
          </GoBackButtonWrapper>
          <UserCard />
          </GoBackButtonUserCardWrapper>
          

          <OrdersContainer>
            <h2 style={{ paddingLeft: "20px" }}>Orders:</h2>

            <OrderTitles>
              <TitleOrder>Date of order: </TitleOrder>
              <TitleOrder>Adress: </TitleOrder>
              <TitleOrder>Delivery time:</TitleOrder>
              <TitleOrder>Amount €: </TitleOrder>
              <TitleOrder>Order status: </TitleOrder>
            </OrderTitles>

            {userOrders}
          </OrdersContainer>

          {orders && (
            <ScrollUpButtonWrapper>
              <ScrollUpArrowButton/>
            </ScrollUpButtonWrapper>
          )}
        </UseProfileWrapper>
      )}
    </PageWrapper>
  )
}

export default UserProfile
