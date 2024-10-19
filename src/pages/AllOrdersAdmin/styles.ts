import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 40px;
`
export const GoBackButtonWrapper = styled.div`
  display: flex;
  gap: 100px;
`

export const ScrollUpButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`
