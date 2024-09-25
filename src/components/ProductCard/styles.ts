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

const getSizeOfCardElements = (isSinglePageProduct: boolean | undefined) => {
  if (isSinglePageProduct) {
    return ""
  } else {
    return ""
  }
}

export const ProductWrapper = styled("div")<StyledCardProps>`
  display: flex;
  flex-direction: column;
  height: 300px;
  flex-direction: ${({ isSinglePageProduct }) =>
    getCardFlexDirection(isSinglePageProduct)};
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
export const ProductMainInfo = styled.div``

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
