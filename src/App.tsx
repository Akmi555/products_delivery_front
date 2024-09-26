import Layout from "components/Layout/Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyles from "styles/GlobalStyles"
import Cart from "pages/Cart/Cart"
import AllProducts from "pages/AllProducts/AllProducts"
import UserProfile from "pages/UserProfile/UserProfile"
import OneProduct from "pages/OneProduct/OneProduct"
import Registration from "pages/Registration/Registration"

function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<AllProducts/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/oneProductCard" element={<OneProduct/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="*" element={"error 404 - Page not found"}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App
