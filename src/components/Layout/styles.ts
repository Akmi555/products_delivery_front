import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"
import mainPicGradient from "assets/main-pic-gradient.png"

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  // шрифт для всего сайта 
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 500px;
  /* background-color: black; */
  padding: 30px;
  background-image: url(${mainPicGradient});
  background-size: cover;
`

export const Logo = styled.img`
  height: 50px;
  width: 100px;
  //width: fit-content;
  cursor: pointer;
`

export const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`

export const NavLinkStyled = styled(NavLink)`

`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: black;
`

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: black;
  color: white;
  font-size: 11px;
`

export const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CompanyInfo = styled.p`
`
