import styled from "@emotion/styled"

import { colors } from "styles/colors"
import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  justify-content: center;
`

export const RegistrationContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
  width: 590px;
  min-height: 450px;
  max-height: fit-content;
  padding: 60px;
  border-radius: 50px;
  background-color: white;
  gap: 30px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
