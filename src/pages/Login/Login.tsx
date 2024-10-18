import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import * as React from 'react';

import { useFormik } from "formik"
import * as Yup from "yup"
import { AppDispatch } from "store/store"
import { useAppSelector } from "store/hooks"
import { cartActions } from "store/redux/cart/cartSlice"
import { orderAction } from "store/redux/order/orderSlice"
import {
  userAuthAction,
  userAuthSelectors,
} from "store/redux/users/userAuthSlice"

import { Alert } from "@mui/material"

import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import ButtonMain from "components/ButtonMain/ButtonMain"

import {
  ButtonContainer,
  FormWrapper,
  InputContainer,
  PageName,
  PageWrapper,
} from "./styles"

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { error } = useAppSelector(userAuthSelectors.userAuthState)

  let EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
    onSubmit: async (values, helpers) => {
      const dispatchResult = await dispatch(
        userAuthAction.login({
          email: values.email,
          password: values.password,
        }),
      )
      // пример как выполнить что то при fulfilled
      if (userAuthAction.login.fulfilled.match(dispatchResult)) {
        dispatch(userAuthAction.getUser())
        dispatch(orderAction.getOrders())
        dispatch(cartActions.openCart())
        navigate("/")
      }
      // ! в span поверх логина(формика) вывести просто текст ошибки, alert плохая практика
      helpers.resetForm()
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
            value={formik.values.email.toLowerCase()}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Input
            id="password-id"
            name="password"
            type="password"
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
