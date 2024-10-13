import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppDispatch } from "store/hooks"
import { ordersAction } from "store/redux/orders/orderSlice"
import {
  ButtonContainer,
  InputContainer,
  PageName,
  PageWrapper,
  RegistrationContainer,
} from "./styles"
import Input from "components/Input/Input"
import ButtonMain from "components/Button/Button"
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { PaymentMethod } from "store/redux/orders/types"
import { useState } from "react"

function OrderForm() {
  const dispatch = useAppDispatch()

  const [payment, setPayment] = useState<string>("CREDIT_CARD")
  const handleChange = (event: SelectChangeEvent) => {
    setPayment(event.target.value)
  }

  const validationSchema = Yup.object().shape({
    address: Yup.string().required().max(100),
    deliveryTime: Yup.string().required().max(20),
  })

  const formik = useFormik({
    initialValues: {
      address: "",
      deliveryTime: "",
      paymentMethod: payment,
    },
    validationSchema,
    validateOnChange: false,

    onSubmit(values, helpers) {
      dispatch(
        ordersAction.createOrder({
          address: values.address,
          deliveryTime: values.deliveryTime,
          paymentMethod: payment,
        }),
      )

      helpers.resetForm()
    },
  })

  return (
    <PageWrapper>
      <PageName>Make Order</PageName>
      <RegistrationContainer onSubmit={formik.handleSubmit}>
        <InputContainer>
          <Input
            id="address-id"
            name="address"
            type="text"
            placeholder="Here your address"
            label="Address*"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
          />
          <Input
            id="deliveryTime-id"
            name="deliveryTime"
            type="text"
            placeholder="Here your deliveryTime"
            label="Delivery time*"
            value={formik.values.deliveryTime}
            onChange={formik.handleChange}
            error={formik.errors.deliveryTime}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="payment-method">Payment Method</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="paymentMethod"
                value={payment}
                label="Payment Method"
                onChange={handleChange}
              >
                <MenuItem value={"CREDIT_CARD"}>Credit card</MenuItem>
                <MenuItem value={"PAYPAL"}>Pay-Pal</MenuItem>
                <MenuItem value={"BANK_TRANSFER"}>Bank Transfer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </InputContainer>
        <ButtonContainer>
          <ButtonMain
            disabled={!formik.dirty || formik.isSubmitting}
            buttonName="Submit order"
            type="submit"
          />
        </ButtonContainer>
      </RegistrationContainer>
    </PageWrapper>
  )
}

export default OrderForm
