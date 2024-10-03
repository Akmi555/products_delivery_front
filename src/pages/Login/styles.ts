import styled from "@emotion/styled"

import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const PageName = styled.h4`
  font-size: xx-large;
  margin-top: 10px;
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 400px;
  width: 590px;
  background-color: white;
  border-radius: 10px;
  padding: 60px;
  margin: 50px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const ButtonContainer = styled.div``

export const GoToRegistrationLink = styled.a`
  cursor: pointer;
`
