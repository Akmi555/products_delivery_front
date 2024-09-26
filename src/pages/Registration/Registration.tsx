import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { Alert } from "@mui/material"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"

import {
  RegistrationContainer,
  InputContainer,
  ButtonContainer,
  PageWrapper,
} from "./styles"

function Registration() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  let EMAIL_REGX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name field is required")
      .min(2, "First name field should contain minimum 2 symbols")
      .max(20, "First name field should contain maximum 20 symobols"),
    lastName: Yup.string()
      .required("Last name field is required")
      .min(2, "Last name field should contain minimum 2 symbols")
      .max(20, "Last name field should contain maximum 20 symobols"),
    email: Yup.string().matches(EMAIL_REGX, "Email is not valid"),
    password: Yup.string()
      .required("Password field is required")
      .min(6, "Password field should contain minimum 6 symobols"),
    phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  })

  const dispach = useDispatch()
  //   const createEmployee = employeesAppSliceAction.createEmployee

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,

    onSubmit: (values, helpers) => {
      //   dispach(createEmployee(values))
      helpers.resetForm()
      console.log(values)
      setModalOpen(true)
    },
  })

  return (
    // onSubmit={formik.handleSubmit} пропс для RegistrationContainer
    <PageWrapper>
      <RegistrationContainer>
        <InputContainer>
          <Input
            id="firstName-id"
            name="firstName"
            type="text"
            placeholder="John"
            label="First name*"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName}
          />
          <Input
            id="lastName-id"
            name="lastName"
            type="text"
            placeholder="Johnson"
            label="Last name*"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.errors.lastName}
          />
          <Input
            id="email-id"
            name="email"
            type="text"
            placeholder="mail@mail.com"
            label="Email*"
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
          <Input
            id="phoneNumber-id"
            name="phoneNumber"
            type="text"
            placeholder="+491754567645"
            label="Phone Number*"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.errors.phoneNumber}
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
      </RegistrationContainer>
    </PageWrapper>
  )
}

export default Registration
