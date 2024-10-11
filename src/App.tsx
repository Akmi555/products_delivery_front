import Layout from "components/Layout/Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyles from "styles/GlobalStyles"
import Cart from "pages/Cart/Cart"
import AllProducts from "pages/AllProducts/AllProducts"
import UserProfile from "pages/UserProfile/UserProfile"
import OneProduct from "pages/OneProduct/OneProduct"
import Registration from "pages/Registration/Registration"
import Login from "pages/Login/Login"
import AddProductAdmin from "pages/AddProductAdmin/AddProductAdmin"
import AllUsers from "pages/AllUsersAdmin/AllUsersAdmin"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "store/hooks"
import {
  userAuthAction,
  userAuthSelectors,
} from "store/redux/users/userAuthSlice"
import { cartActions } from "store/redux/cart/cartSlice"
import Orders from "pages/Orders/Orders"
import AllProductsAdmin from "pages/AllProductsAdmin/AllProductsAdmin"


function App() {
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(userAuthAction.getUser())
  }, [])

  useEffect(() => {
    if (currentUser) {
      dispatch(cartActions.openCart())
    }
  }, [currentUser])
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/one-product-card" element={<OneProduct />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProductAdmin />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/all-products-admin" element={<AllProductsAdmin />} />
          <Route path="*" element={"error 404 - Page not found"} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
