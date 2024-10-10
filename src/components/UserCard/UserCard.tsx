import ButtonMain from "components/Button/Button"
import {
  Email,
  FirstName,
  LastName,
  NameWrapper,
  Phone,
  Role,
  UserCardWrapper,
} from "./styles"
import { ProductCardProps } from "./types"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"
import { userAuthAction, userAuthSelectors } from "store/redux/users/userAuthSlice"

function UserCard() {

  const {currentUser} = useAppSelector(userAuthSelectors.userAuthState)
  const dispatch = useAppDispatch()
  const firstName: string | undefined = currentUser?.firstName
  const lastName: string | undefined  = currentUser?.lastName
  const email: string | undefined  = currentUser?.email
  const phone: string | undefined  = currentUser?.phone
  const role: string | undefined  = currentUser?.roles[0].authority

  const logOut = () => {
    localStorage.clear()
    dispatch(cartActions.clearCartLogOut())
    dispatch(userAuthAction.logOut())
    // ! СДЕЛАТЬ ЧТОБЫ ОБНОВИЛАСЬ СТРАНИЦА 
  }
  return (
    <UserCardWrapper>
      <NameWrapper>
        <FirstName>{firstName}</FirstName>
        <LastName>{lastName}</LastName>
      </NameWrapper>
      <Email>{email}</Email>
      <Phone>{phone}</Phone>
      <Role>{role}</Role>
      <ButtonMain type="button" onClick={logOut} buttonName="Log out" />
    </UserCardWrapper>
  )
}

export default UserCard
