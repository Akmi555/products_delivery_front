import styled from "@emotion/styled"
import { NavLink } from "react-router-dom"

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
  background-color: black;
  padding: 30px;
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

// в погоде это было сделано по другому, пока сделала как помню
export const NavLinkStyled = styled(NavLink)`

`

// export const Link = styled.a`
//   font-size: 20px;
//   text-decoration: none;
//   cursor: pointer;
// `
export const LinkImg = styled.img`
  height: 30px;
  width: 30px;
`

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px;
  background-color: black;
  color: white;
`

export const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const CompanyInfo = styled.p``
