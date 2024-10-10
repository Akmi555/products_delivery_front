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
import { useAppDispatch } from "store/hooks"
import { cartActions, cartSelectors } from "store/redux/cart/cartSlice"
import { userAuthAction } from "store/redux/users/userAuthSlice"

function UserCard({ userData }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const firstName: string | undefined = userData?.firstName
  const lastName: string | undefined  = userData?.lastName
  const email: string | undefined  = userData?.email
  const phone: string | undefined  = userData?.phone
  const role: string | undefined  = userData?.roles[0].title

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
