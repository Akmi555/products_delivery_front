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
  ShortInfoContainer,
  LogoLinksWrapper,
  Info,
  Text,
  TextBold,
  TextNormal,
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
import { userAuthSelectors } from "store/redux/users/userAuthSlice"
import CarouselMui from "components/Carousel/Carousel"
import { colors } from "styles/colors"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"

function Layout({ children }: LayoutProps) {
  const match = useMatch("/")

  const { allProductsFromCart } = useAppSelector(cartSelectors.cartState)
  const { currentUser } = useAppSelector(userAuthSelectors.userAuthState)

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: -20,
      // border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }))

  // вынести в useEffect
  // или сделать отдельное свойство в стейте корзины
  let totalQuantity: number = 0

  if (currentUser) {
    for (let i = 0; i <= allProductsFromCart.length - 1; i++) {
      totalQuantity = totalQuantity + allProductsFromCart[i].productQuantity
    }
  }

  const StyledSircle = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: -20,
      colors: "pink",
      padding: "0 4px",
    },
  }))

  const header = () => {
    return (
      <>
        <LogoLinksWrapper>
          <HeaderLogoContainer>
            <NavLinkStyled to="/">
              <Logo src={logoWhite} />
            </NavLinkStyled>
          </HeaderLogoContainer>
          <NavigationContainer>
            <LinkHeaderCustomized
              to="/user-profile"
              whiteImg={userWhite}
              greenImg={userGreen}
            >
              {currentUser && (
              <StyledSircle color="success" variant="dot"></StyledSircle>
              )}
            </LinkHeaderCustomized>
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
          {/* <CarouselMui /> */}
        </LogoLinksWrapper>
        {match ? (
          <ShortInfoContainer>
            <Info>
              <AccessTimeIcon sx={{ color: "black" }} fontSize="large" />
              <Text>
                <TextBold>up to 90 min</TextBold>
                <TextNormal>delivery time</TextNormal>
              </Text>
            </Info>
            <Info>
              <AccountBalanceWalletIcon
                sx={{ color: "black" }}
                fontSize="large"
              />
              <Text>
                <TextBold>10 €</TextBold>
                <TextNormal>min order sum</TextNormal>
              </Text>
            </Info>
            <Info>
              <LocalShippingIcon sx={{ color: "black" }} fontSize="large" />
              <Text>
                <TextBold>5 €</TextBold>
                <TextNormal>cost of delivery</TextNormal>
              </Text>
            </Info>
            <Info>
              <WorkspacePremiumIcon sx={{ color: "black" }} fontSize="large" />
              <Text>
                <TextBold>from 50 €</TextBold>
                <TextNormal>free delivery</TextNormal>
              </Text>
            </Info>
          </ShortInfoContainer>
        ) : (
          <></>
        )}
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
