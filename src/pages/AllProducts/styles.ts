import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  flex-direction: column;
  justify-content: space-between;
  gap: 35px;
  flex-wrap: wrap;
`
export const ProductCardsWrapper = styled.div`
  display: flex;
  margin-left: 53px;
  margin-right: 53px;
  padding: 10px;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: start;
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
  /* flex-direction: column; */
  justify-content: end;
`
