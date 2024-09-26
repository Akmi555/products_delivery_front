import {
  Footer,
  CompanyInfoContainer,
  Header,
  LayoutWrapper,
  Logo,
  Main,
  NavigationContainer,
  CompanyInfo,
  NavLinkStyled,
} from "./styles"
import logoWhite from "assets/logo-white.png"
import userWhite from "assets/user-white.png"
import cartWhite from "assets/shopping-cart-white.png"
import userGreen from "assets/user-green.png"
import cartGreen from "assets/shopping-cart-green.png"
import { LayoutProps } from "./types"
import LinkHeaderCustomized from "components/LinkHeaderIcon/LinkHeaderCustomized"

function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header>
        <NavLinkStyled to="/">
          <Logo src={logoWhite} />
        </NavLinkStyled>
        <NavigationContainer>
        <LinkHeaderCustomized
            to="/registration"
            whiteImg={userWhite}
            greenImg={userGreen}
          />
          <LinkHeaderCustomized
            to="/userProfile"
            whiteImg={userWhite}
            greenImg={userGreen}
          />
          <LinkHeaderCustomized
            to="/cart"
            whiteImg={cartWhite}
            greenImg={cartGreen}
          />
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
        <NavLinkStyled to="/">
          <Logo src={logoWhite} />
        </NavLinkStyled>
      </Footer>
    </LayoutWrapper>
  )
}

export default Layout
