import { useFormik } from "formik"
import * as Yup from "yup"
import { Alert } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "store/store"

import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import ButtonMain from "components/Button/Button"
import { userAuthAction } from "store/redux/users/userAuthSlice"

import {
  ButtonContainer,
  FormWrapper,
  InputContainer,
  PageName,
  PageWrapper,
} from "./styles"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  let EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .matches(EMAIL_REGX, "Email is not valid"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password field should contain minimum 3 symobols"),
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
      navigate("/")
    },
  })

  return (
    <PageWrapper>
      <PageName>Login</PageName>
      <FormWrapper onSubmit={formik.handleSubmit}>
        <InputContainer>
          <Input
            id="email-id"
            name="email"
            type="email"
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
          <ButtonMain
            disabled={!formik.dirty || formik.isSubmitting}
            buttonName="Login"
            type="submit"
          />
        </ButtonContainer>
        <Link to="/registration">or register</Link>
        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <Alert severity="success">Successful</Alert>
        </Modal>
      </FormWrapper>
    </PageWrapper>
  )
}

export default Login
