import {
  Footer,
  CompanyInfoContainer,
  LayoutWrapper,
  Logo,
  Main,
  NavigationContainer,
  CompanyInfo,
  NavLinkStyled,
  FooterLogoContainer,
  HeaderLogoContainer,
  HeaderMainPaige,
  HeaderSimplePage,
} from "./styles"
import logoWhite from "assets/logo-white.png"
import userWhite from "assets/user-white.png"
import cartWhite from "assets/shopping-cart-white.png"
import userGreen from "assets/user-green.png"
import cartGreen from "assets/shopping-cart-green.png"
import { LayoutProps } from "./types"
import LinkHeaderCustomized from "components/LinkHeaderIcon/LinkHeaderCustomized"
import { useMatch } from "react-router-dom"

import Badge, { BadgeProps } from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import { useAppSelector } from "store/hooks"
import { cartSelectors } from "store/redux/cart/cartSlice"

function Layout({ children }: LayoutProps) {
  const match = useMatch("/")

  const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: -20,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))

  // вынести в useEffect 
  // или сделать отдельное свойство в стейте корзины 
  let totalQuantity: number = 0
  for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
    totalQuantity = totalQuantity + allProductsFromCart[i].productQuantity
  }

  const header = () => {
    return (
      <>
        <HeaderLogoContainer>
          <NavLinkStyled to="/">
            <Logo src={logoWhite} />
          </NavLinkStyled>
        </HeaderLogoContainer>
        <NavigationContainer>
          <LinkHeaderCustomized to="/addProduct" linkText="addProduct" />
          <LinkHeaderCustomized
            to="/userProfile"
            whiteImg={userWhite}
            greenImg={userGreen}
          />
          <LinkHeaderCustomized
            to="/cart"
            whiteImg={cartWhite}
            greenImg={cartGreen}
          >
            <StyledBadge
              badgeContent={totalQuantity}
              color="error"
            ></StyledBadge>
          </LinkHeaderCustomized>
        </NavigationContainer>
      </>
    )
  }

  return (
    <LayoutWrapper>
      {match ? (
        <HeaderMainPaige>{header()}</HeaderMainPaige>
      ) : (
        <HeaderSimplePage>{header()}</HeaderSimplePage>
      )}
      <Main>{children}</Main>
      <Footer>
        <CompanyInfoContainer>
          <CompanyInfo>foodNOW GmbH</CompanyInfo>
          <CompanyInfo>foodNOW@gmail.com</CompanyInfo>
          <CompanyInfo>+49 175 456 76 45</CompanyInfo>
          <CompanyInfo>Hauptstr. 1, 10827 Berlin, Deutchland</CompanyInfo>
        </CompanyInfoContainer>

        <NavLinkStyled to="/">
          <FooterLogoContainer>
            <Logo src={logoWhite} />
          </FooterLogoContainer>
        </NavLinkStyled>
      </Footer>
    </LayoutWrapper>
  )
}

export default Layout
