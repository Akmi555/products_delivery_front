import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  padding: 40px;
  gap: 10px;
`
export const GoBackButtonWrapper = styled.div`
  display: flex;
  gap: 100px;
  margin-bottom: 10px;
`
export const ScrollUpButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`