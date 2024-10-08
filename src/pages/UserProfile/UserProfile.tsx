import { useAppSelector } from "store/hooks"
import { PageWrapper, UseProfileWrapper } from "./styles"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import { LoginMistakeContainer } from "pages/Cart/styles"
import { Link } from "react-router-dom"
import { Box, CircularProgress } from "@mui/material"

function UserProfile() {
  // получение айди залогиненного пользователя для отображения корзины (запрос находится в useEffect ниже)
  const { currentUser, accessToken } = useAppSelector(
    userAuthSelectors.userAuthState,
  )
  const currentUserID: number | undefined = currentUser?.id
  return (
    <PageWrapper>
      {!currentUserID && (
        <LoginMistakeContainer>
          <h4>Oops!</h4> <p> You are not logged in</p>
          <Link to="/login">login</Link>
        </LoginMistakeContainer>
      )}
      {currentUserID && (
        <UseProfileWrapper>
          <>User profile page is coming in close future</>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </UseProfileWrapper>
      )}
    </PageWrapper>
  )
}

export default UserProfile
