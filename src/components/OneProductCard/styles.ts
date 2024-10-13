import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  background-color: white;
  border-radius: 50px;
  padding: 40px;
  margin: 40px;
  gap: 30px;
`

export const GoBackButtonWrapper = styled.div`
  display: flex;
 
`
export const MainInfoAndImgContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`

export const ProductMainInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  width: 200px ;
`

export const LinkProductCard = styled(Link)`
  text-decoration: none;
  color: black;
`

export const ImgContainer = styled.div`
  width: 450px;
  /* height: 450px; */
`

export const ImgProduct = styled.img`
  width: 450px;
`

export const ProductName = styled.div`
  font-size: 30px;
`

export const ProductWeight = styled.div`
  color: #7c7c7c;
  font-size: 16px;
`

export const PriceButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`

export const ProductPrice = styled.div`
  font-weight: bold;
  font-size: 20px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 60px;
`
export const ProductDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
 gap: 20px;
`
export const ProductDescription = styled.div``
