import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  flex-direction: column;
  /* gap: 35px;
  flex-wrap: wrap; */
`
export const ProductCardsWrapper = styled.div`
  display: flex;
  gap: 35px;
  flex-wrap: wrap;
`
export const PaginatorWrapper = styled.div`
  display: flex;
  gap: 35px;
  flex-wrap: wrap;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  width: 40px;
`
