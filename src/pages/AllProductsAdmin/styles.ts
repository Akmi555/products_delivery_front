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
  /* height: 100%; */
  margin-bottom: 10px;
`
export const ScrollUpButtonWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: end;
`

// export const ProductCardsWrapper = styled.div`
//   display: flex;
//   gap: 30px;
//   flex-wrap: wrap;
//   justify-content: space-evenly;
// `

// export const PaginatorWrapper = styled.div`
//   display: flex;
//   gap: 35px;
//   flex-wrap: wrap;
//   justify-content: center;
// `

// export const ButtonContainer = styled.div`
//   display: flex;
//   flex: 1;
//   width: 40px;
// `
