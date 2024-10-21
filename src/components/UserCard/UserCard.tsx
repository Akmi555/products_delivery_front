import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions } from "store/redux/cart/cartSlice"
import {
  userAuthAction,
  userAuthSelectors,
} from "store/redux/users/userAuthSlice"

import ButtonMain from "components/ButtonMain/ButtonMain"
import {
  AvatarWrapper,
  Avatarka,
  ButtonsContainer,
  DataWrapper,
  Description,
  Email,
  FirstName,
  LastName,
  Name,
  Phone,
  Role,
  UserCardWrapper,
  UserDataWrapper,
} from "./styles"

import emptyProfileImg from "assets/profile.png"
import { colors } from "styles/colors"
import { orderAction } from "store/redux/order/orderSlice"

function UserCard() {
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const roleID: number | undefined = currentUser?.roles[0].id

  const logOut = () => {
    localStorage.clear()
    dispatch(cartActions.logOut())
    dispatch(userAuthAction.logOut())
    dispatch(orderAction.logOut())
    console.log(currentUser)
  }
  
  return (
    <UserCardWrapper>
      <UserDataWrapper>
        <AvatarWrapper>
          <Avatarka src={emptyProfileImg} />
        </AvatarWrapper>
        <DataWrapper>
          <div>
            <Description>Name:</Description>
            <Name>
              <FirstName>{currentUser?.firstName}</FirstName>
              <LastName>{currentUser?.lastName}</LastName>
            </Name>
          </div>
          <div>
            <Description>Email:</Description>
            <Email>{currentUser?.email}</Email>
          </div>
          <div>
            <Description>Phone:</Description>
            <Phone>{currentUser?.phone}</Phone>
          </div>
          {roleID === 2 && (
            <div>
              <Description>Role:</Description>
              <Role>{currentUser?.roles[0].authority}</Role>
            </div>
          )}
        </DataWrapper>
      </UserDataWrapper>
      <ButtonsContainer>
        {roleID === 2 && (
          <>
            <p>Admin menu:</p>
            <ButtonMain
              type="button"
              onClick={() => navigate("/add-product")}
              buttonName="Add product"
            />
            <ButtonMain
              type="button"
              onClick={() => navigate("/all-products-admin")}
              buttonName="All products"
            />
            <ButtonMain
              type="button"
              onClick={() => navigate("/all-users")}
              buttonName="All users"
            />
            <ButtonMain
              type="button"
              onClick={() => navigate("/orders")}
              buttonName="All orders"
            />
            <p>Customer menu:</p>
          </>
        )}
        <ButtonMain
          buttonName="Log out"
          onClick={logOut}
          color={colors.ERROR}
        />
      </ButtonsContainer>
    </UserCardWrapper>
  )
}

export default UserCard
