import {
  Footer,
  CompanyInfoContainer,
  Header,
  LayoutWrapper,
  LinkImg,
  Logo,
  Main,
  NavigationContainer,
  CompanyInfo,
  NavLinkStyled,
} from "./styles"
import logoWhite from "assets/logo-white.png"
import userWhite from "assets/user-white.png"
import cartWhite from "assets/shopping-cart-white.png"
import { LayoutProps } from "./types"

function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header>
        <NavLinkStyled to="/">
          <Logo src={logoWhite} />
        </NavLinkStyled>
        <NavigationContainer>
          <NavLinkStyled to="/userProfile" >
            <LinkImg src={userWhite} />
            {/* todo ИЗМЕНЕНИЕ КАРТИНКИ ПРИ НАЖАТИИ НА ЗЕЛЕНЫЙ ЦВЕТ ЧЕРЕЗ isActive */}
          </NavLinkStyled>
          <NavLinkStyled to="/cart">
            <LinkImg src={cartWhite} />
          </NavLinkStyled>
        </NavigationContainer>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <CompanyInfoContainer>
          <CompanyInfo>foodNOW GmbH</CompanyInfo>
          <CompanyInfo>foodNOW@gmail.com</CompanyInfo>
          <CompanyInfo>+49 175 456 76 45</CompanyInfo>
          <CompanyInfo>Hauptstr. 1, 10827 Berlin, Deutchland</CompanyInfo>
        </CompanyInfoContainer>
        <Logo src={logoWhite} />
      </Footer>
    </LayoutWrapper>
  )
}

export default Layout
