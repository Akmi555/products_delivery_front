import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { useFormik } from "formik"
import * as Yup from "yup"
import { AppDispatch } from "store/store"
import { cartActions } from "store/redux/cart/cartSlice"
import { orderAction } from "store/redux/order/orderSlice"
import { userAuthAction } from "store/redux/users/userAuthSlice"

import Input from "components/Input/Input"
import ButtonMain from "components/ButtonMain/ButtonMain"

import {
  ButtonContainer,
  FormWrapper,
  InputContainer,
  PageName,
  PageWrapper,
} from "./styles"
import { ToastContainer, toast } from "react-toastify"

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const notifyLoginRejected = () =>
    toast.error("Login or email is invalid. Try again.", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
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
    onSubmit: async (values, helpers) => {
      const dispatchResult = await dispatch(
        userAuthAction.login({
          email: values.email,
          password: values.password,
        }),
      )
      // пример как выполнить что то при fulfilled
      if (userAuthAction.login.fulfilled.match(dispatchResult)) {
        dispatch(userAuthAction.getUser()),
          dispatch(orderAction.getOrders()),
          dispatch(cartActions.openCart()),
          helpers.resetForm()
        navigate("/user-profile")
      }
      // пример как выполнить что то при rejected
      if (userAuthAction.login.rejected.match(dispatchResult)) {
        notifyLoginRejected()
      }
    },
  })

  return (
    <PageWrapper>
      <ToastContainer />
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
        <Link style={{ color: "green" }} to="/registration">
          or register
        </Link>
      </FormWrapper>
    </PageWrapper>
  )
}

export default Login
