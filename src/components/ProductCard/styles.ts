import styled from "@emotion/styled"
import { Link } from "react-router-dom"

interface StyledCardProps {
  isSinglePageProduct?: boolean | undefined
}

const getCardFlexDirection = (isSinglePageProduct: boolean | undefined) => {
  if (isSinglePageProduct) {
    return "row"
  } else {
    return "column"
  }
}

const getAlignItems = (isSinglePageProduct: boolean | undefined) => {
  if (isSinglePageProduct) {
    return "center"
  } else {
    return "normal"
  }
}

const getCardHeight = (isSinglePageProduct: boolean | undefined) => {
  if (isSinglePageProduct) {
    return "200px"
  } else {
    return "300px"
  }
}

const getCardWidth = (isSinglePageProduct: boolean | undefined) => {
  if (isSinglePageProduct) {
    return "350px"
  }
}

const getCardWidth2 = (isSinglePageProduct: boolean | undefined) => {
  if (isSinglePageProduct) {
    return "400px"
  }
}

const getJustifyContent = (isSinglePageProduct: boolean | undefined) => {
  if (isSinglePageProduct) {
    return "space-between"
  }
}

export const ProductWrapper = styled("div")<StyledCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isSinglePageProduct }) =>
    getJustifyContent(isSinglePageProduct)};
  width: ${({ isSinglePageProduct }) => getCardWidth(isSinglePageProduct)};
  height: ${({ isSinglePageProduct }) => getCardHeight(isSinglePageProduct)};
  flex-direction: ${({ isSinglePageProduct }) =>
    getCardFlexDirection(isSinglePageProduct)};
  align-items: ${({ isSinglePageProduct }) =>
    getAlignItems(isSinglePageProduct)};
`

export const LinkProductCard = styled(Link)`
  text-decoration: none;
  color: black;
`
export const PhotoNameWrapper = styled.div``

export const ImgContainer = styled.div`
  width: 200px;
  height: 200px;
`

export const ImgProduct = styled.img`
  width: 200px;
`

// НЕ РАБОТАЕТ 
export const ProductMainInfo = styled("div")<StyledCardProps>`
    width: ${({ isSinglePageProduct }) => getCardWidth2(isSinglePageProduct)};
    
`

export const ProductName = styled.div``

export const ProductWeight = styled.div`
  color: #7c7c7c;
  font-size: 12px;
`

export const PriceButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`

export const ProductPrice = styled.div`
  font-weight: bold;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 60px;
`
