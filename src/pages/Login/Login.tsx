import { useFormik } from "formik"
import * as Yup from "yup"
import { Alert } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "store/store"

import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import ButtonMain from "components/Button/Button"
import {
  userAuthAction,
  userAuthSelectors,
} from "store/redux/users/userAuthSlice"

import {
  ButtonContainer,
  FormWrapper,
  InputContainer,
  PageName,
  PageWrapper,
} from "./styles"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "store/hooks"
import { cartActions } from "store/redux/cart/cartSlice"

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { currentUser, error, accessToken } = useAppSelector(
    userAuthSelectors.userAuthState,
  )


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
        userAuthAction.login({
          email: values.email,
          password: values.password,
        }),
      )
      helpers.resetForm()
      setIsLoggedIn(currentUser?.id)
    },
  })
// нужна помощь чтобы сделать навигацию на другую страниук или выброс ошибки после логина 

const [isLoggedIn, setIsLoggedIn] = useState<number | undefined>()

  // if (!isLoggedIn) {
  //   setModalOpen(true)
  // } 
  
  // if (isLoggedIn) {
  //   navigate("/")
  // }

  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn])

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
            value={formik.values.email.toLowerCase()}
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
          <Alert severity="error">Error: {error}</Alert>
        </Modal>
      </FormWrapper>
    </PageWrapper>
  )
}

export default Login
