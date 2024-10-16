import styled from "@emotion/styled"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 400px;
  width: 590px;
  background-color: white;
  border-radius: 10px;
  padding: 60px;
  margin: 50px;
`

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
