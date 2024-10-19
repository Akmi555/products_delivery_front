import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  flex-direction: column;
  gap: 35px;
`

export const CategoriesWrapper = styled.div`
  display: flex;
  align-items: center;
 justify-content: center;
 align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
`

export const ProductCardsWrapper = styled.div`
  display: flex;
  padding: 10px;
  gap: 27px;
  flex-wrap: wrap;
`

export const PaginatorWrapper = styled.div`
  display: flex;
  gap: 35px;
  flex-wrap: wrap;
  justify-content: center;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  width: 40px;
`

export const GoBackButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`
