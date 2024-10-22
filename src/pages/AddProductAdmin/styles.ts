import styled from "@emotion/styled"

import { globalPageStyles } from "styles/GlobalStyles"

export const PageWrapper = styled.div`
  ${globalPageStyles}
  justify-content: space-between;
  padding: 40px;
`

export const GoBackButtonWrapper = styled.div`
  display: flex;
  height: 100%;
`

export const NameAndFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PageName = styled.h4`
  font-size: xx-large;
  margin-top: 10px;
`

export const AddProductContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px;
  width: 590px;
  min-height: 450px;
  max-height: fit-content;
  padding: 60px;
  border-radius: 10px;
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

export const ImgUploadButtonContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  padding: 0 40px 0 40px;
`

export const ImgCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const UploadedImg = styled.img`
  width: 100px;
`
