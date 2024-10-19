import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
`

export const GoBackButtonWrapper = styled.div`
  display: flex;
  gap: 100px;
`

export const ProductCardsWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: space-evenly;
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

export const ScrollUpButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`
