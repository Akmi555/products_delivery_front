import Input from "components/Input/Input"
import {
  ButtonContainer,
  FormWrapper,
  InputContainer,
  PageWrapper,
} from "./styles"
import { useFormik } from "formik"
import * as Yup from "yup"
import Modal from "components/Modal/Modal"
import Button from "components/Button/Button"
import { Alert } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { userAuthAction } from "store/redux/users/userAuthSlice"
import { LoginData } from "store/redux/users/types"
import { AppDispatch } from "store/store"

function Login() {
  //   const dispach = useDispatch()
  const dispatch = useDispatch<AppDispatch>()

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  let EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(EMAIL_REGX, "Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password field should contain minimum 6 symobols"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      dispatch(
        userAuthAction.loginUser({
          email: values.email,
          password: values.password,
        }),
      )
      helpers.resetForm()
      setModalOpen(true)
    },
  })

  //   dispatch(
  //     productsAction.getProducts({
  //       currentPage: currentPage,
  //       pageSize: pageSize,
  //     }),
  return (
    <PageWrapper>
      <FormWrapper onSubmit={formik.handleSubmit}>
        <InputContainer>
          <Input
            id="email-id"
            name="email"
            type="text"
            placeholder="mail@mail.com"
            label="E-mail*"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Input
            id="password-id"
            name="password"
            type="text"
            label="Password*"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            disabled={!formik.dirty || formik.isSubmitting}
            buttonName="Registration"
            type="submit"
          />
        </ButtonContainer>
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <Alert severity="success">Successful</Alert>
        </Modal>
      </FormWrapper>
    </PageWrapper>
  )
}

export default Login
