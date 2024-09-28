import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"
import mainPicGradient from "assets/header-black.jpg"

const getHeaderHeight = () => {}

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

export const HeaderMainPaige = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 30px;
  height: fit-content;
  background-color: black;
  background-size: cover;
  height: 500px;
  background-image: url(${mainPicGradient});
`

export const HeaderSimplePage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 30px;
  height: fit-content;
  background-color: black;
  background-size: cover;
`

export const HeaderLogoContainer = styled.div`
  width: 200px;
  margin-left: 120px;
`

export const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`

export const NavigationContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`

export const NavLinkStyled = styled(NavLink)``

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
  height: fit-content;
  width: 100%;
  padding: 20px;
  background-color: black;
  color: white;
  font-size: 11px;
`
export const FooterLogoContainer = styled.div`
  width: 150px;
  margin-right: 30px;
`

export const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CompanyInfo = styled.p``
