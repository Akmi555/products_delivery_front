import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useQueryParam, NumberParam } from "use-query-params"

import { useAppDispatch } from "store/hooks"
import { orderAction } from "store/redux/order/orderSlice"

import ButtonMain from "components/ButtonMain/ButtonMain"

import TaskAltIcon from "@mui/icons-material/TaskAlt"

import { PageWrapper, TextWrapper, MessageContainer } from "./styles"

function PaymentSuccess() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [num] = useQueryParam("orderId", NumberParam)

  useEffect(() => {
    dispatch(orderAction.payForOrder({ id: num }))
  }, [])

  return (
    <PageWrapper>
        <MessageContainer>
          <TaskAltIcon sx={{ color: "#00BF63", fontSize: "5rem" }} />
          <h2>Successful payment</h2>
          <p>Order number: {num}</p>
          <TextWrapper>
            <p>Thank you for choosing foodNOW!</p>
            <p>We appreciate your order.</p>
          </TextWrapper>
          <h4>Have a great day!</h4>
          <ButtonMain
            type="button"
            buttonName="continue shopping"
            onClick={() => navigate("/")}
          />
        </MessageContainer>
    </PageWrapper>
  )
}

export default PaymentSuccess
