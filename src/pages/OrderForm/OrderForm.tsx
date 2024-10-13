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
import ButtonMain from "components/ButtonMain/ButtonMain"

function OrderForm() {
  const dispatch = useAppDispatch()

  const validationSchema = Yup.object().shape({
    address: Yup.string().required().max(100),
    deliveryTime: Yup.string().required().max(20),
    paymentMethod: Yup.string().required().max(20),
  })

  const formik = useFormik({
    initialValues: {
      address: "",
      deliveryTime: "",
      paymentMethod: "",
    },
    validationSchema,
    validateOnChange: false,
    onSubmit(values, helpers) {
      dispatch(
        ordersAction.createOrder({
          address: values.address,
          deliveryTime: values.deliveryTime,
          paymentMethod: values.paymentMethod,
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
          <Input
            id="paymentMethod-id"
            name="paymentMethod"
            type="text"
            placeholder="Here your payment method"
            label="Payment method*"
            value={formik.values.paymentMethod}
            onChange={formik.handleChange}
            error={formik.errors.paymentMethod}
          />
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
