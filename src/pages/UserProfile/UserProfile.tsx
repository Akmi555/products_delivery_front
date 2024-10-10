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

function UserProfile() {
  // получение айди залогиненного пользователя для отображения корзины (запрос находится в useEffect ниже)
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)

  const dispatch = useAppDispatch()
  useEffect(() => {
    // dispatch(userAuthAction.getUser())
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
        </UseProfileWrapper>
      )}
    </PageWrapper>
  )
}

export default UserProfile
