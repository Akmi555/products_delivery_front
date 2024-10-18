import { useState } from "react"

import { useFormik } from "formik"
import * as Yup from "yup"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { orderAction, orderSelector } from "store/redux/order/orderSlice"

import ButtonMain from "components/ButtonMain/ButtonMain"
import Input from "components/Input/Input"

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"

// для окна об успешном заказе
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"

import {
  ButtonContainer,
  InputContainer,
  PageName,
  PageWrapper,
  RegistrationContainer,
} from "./styles"

function OrderForm() {
  const dispatch = useAppDispatch()
  const { currentOrder } = useAppSelector(orderSelector.orderState)
  const currentOrderID: number = currentOrder ? currentOrder.id : 0

  // для окна об успешном создании заказа
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }))

  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  // для формика
  const [payment, setPayment] = useState<string>("CREDIT_CARD")
  const handleChange = (event: SelectChangeEvent) => {
    setPayment(event.target.value)
  }

  const validationSchema = Yup.object().shape({
    address: Yup.string().required().max(100),
    deliveryTime: Yup.date().required(),
  })

  const formik = useFormik({
    initialValues: {
      address: "",
      deliveryTime: new Date(),
      paymentMethod: payment,
    },
    validationSchema,
    validateOnChange: false,

    onSubmit(values, helpers) {
      const dispatchResult = dispatch(
        orderAction.confirmOrder({
          id: currentOrderID,
          address: values.address,
          deliveryTime: values.deliveryTime,
          paymentMethod: payment,
        }),
      )
      // действие если fulfilled
      if (orderAction.confirmOrder.fulfilled.match(dispatchResult)) {
        setOpen(true)
      }
      helpers.resetForm()
    },
  })

  return (
    <PageWrapper>
      <PageName>Order details</PageName>
      <RegistrationContainer onSubmit={formik.handleSubmit}>
        <InputContainer>
          <Input
            id="address-id"
            name="address"
            type="text"
            placeholder="Hauptstr 2, 667834 Berlin"
            label="Address* (only Berlin)"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
          />
          <Input
            id="deliveryTime-id"
            name="deliveryTime"
            type="datetime-local"
            placeholder="12.10.2024 13:00"
            label="Delivery time*"
            value={String(formik.values.deliveryTime)}
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

        {/* окно об успешном заказе  */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Order created successfully!
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={theme => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>
              More info about your orders you can find in your profile.
            </Typography>
            <Typography gutterBottom> We will contact you later </Typography>
          </DialogContent>
        </BootstrapDialog>
      </RegistrationContainer>
    </PageWrapper>
  )
}

export default OrderForm
