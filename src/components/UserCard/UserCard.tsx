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
import { useAppDispatch, useAppSelector } from "store/hooks"
import { cartActions } from "store/redux/cart/cartSlice"
import {
  userAuthAction,
  userAuthSelectors,
} from "store/redux/users/userAuthSlice"
import emptyProfileImg from "assets/profile.png"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

function UserCard() {
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const firstName: string | undefined = currentUser?.firstName
  const lastName: string | undefined = currentUser?.lastName
  const email: string | undefined = currentUser?.email
  const phone: string | undefined = currentUser?.phone
  const role: string | undefined = currentUser?.roles[0].authority
  const roleID: number | undefined = currentUser?.roles[0].id

  const logOut = () => {
    localStorage.clear()
    dispatch(cartActions.clearCartLogOut())
    dispatch(userAuthAction.logOut())
    // dispatch(cartActions.deleteCart())
    // ! СДЕЛАТЬ ЧТОБЫ ОБНОВИЛАСЬ СТРАНИЦА
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
              <FirstName>{firstName}</FirstName>
              <LastName>{lastName}</LastName>
            </Name>
          </div>
          <div>
            <Description>Email:</Description>
            <Email>{email}</Email>
          </div>
          <div>
            <Description>Phone:</Description>
            <Phone>{phone}</Phone>
          </div>
          {roleID === 2 && 
          <div>
            <Description>Role:</Description>
            <Role>{role}</Role>
          </div>}
        </DataWrapper>
      </UserDataWrapper>
      <ButtonsContainer>
        {roleID === 2 && (
          <>
            <p>Admin menu:</p>
            <ButtonMain
              type="button"
              onClick={() =>  navigate('/add-product')}
              buttonName="Add product"
            />
            <ButtonMain
              type="button"
              onClick={() => navigate('/all-products-admin')}
              buttonName="All products"
            />
            <ButtonMain
              type="button"
              onClick={() => navigate('/all-users')}
              buttonName="All users"
            />
            <ButtonMain
              type="button"
              onClick={() => navigate('/orders')}
              buttonName="All orders"
            />
            <p>Customer menu:</p>
          </>
        )}
        {/* <ButtonMain type="button" onClick={() => {}} buttonName="My orders" /> */}
        <Button
          variant="contained"
          onClick={logOut}
          color="error"
          style={{ borderRadius: 50, width: "100%" }}
        >
          Log out
        </Button>
      </ButtonsContainer>
    </UserCardWrapper>
  )
}

export default UserCard
