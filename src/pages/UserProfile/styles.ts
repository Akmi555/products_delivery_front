import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  padding: 40px;
  justify-content: center;
`

export const GoBackButtonWrapper = styled.div`
  display: flex;
`

export const GoBackButtonUserCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const UseProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* gap: 100px; */
`
export const OrdersContainer = styled.div`
  display: flex;
  width: 800px;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding-top: 100px;
`

export const OrderTitles = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding-left: 20px;
  gap: 20px;
`

export const TitleOrder = styled.div`
  min-width: 130px;
`
export const ScrollUpButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
