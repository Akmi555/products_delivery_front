import { useAppDispatch, useAppSelector } from "store/hooks"
import { PageWrapper, UseProfileWrapper } from "./styles"
import {
  userAuthAction,
  userAuthSelectors,
} from "store/redux/users/userAuthSlice"
import { LoginMistakeContainer } from "pages/Cart/styles"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import UserCard from "components/UserCard/UserCard"
import { ordersAction, ordersSelector } from "store/redux/orders/orderSlice"
import Order from "components/Order/Order"
import { v4 } from "uuid"

function UserProfile() {
  // получение айди залогиненного пользователя для отображения корзины (запрос находится в useEffect ниже)
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const { orders } = useAppSelector(ordersSelector.ordersState)

  const dispatch = useAppDispatch()

  const userOrders = orders.map(order => (
    <Order key={v4()} orderObjData={order} />
  ))

  useEffect(() => {
    if (currentUser) {
      dispatch(ordersAction.getOrders())
      // dispatch(userAuthAction.getUser())
    }
  }, [])

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
          <UserCard />
          {userOrders}
        </UseProfileWrapper>
      )}
    </PageWrapper>
  )
}

export default UserProfile
