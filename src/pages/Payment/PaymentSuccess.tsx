import { useAppDispatch, useAppSelector } from "store/hooks"
import { PageWrapper, FormWrapper } from "./styles"
import { orderAction, orderSelector } from "store/redux/order/orderSlice"
import { useEffect, useState } from "react"
import { useQueryParam, NumberParam } from "use-query-params"
import ButtonMain from "components/ButtonMain/ButtonMain"
import { useNavigate } from "react-router-dom"
import TaskAltIcon from "@mui/icons-material/TaskAlt"

function PaymentSuccess() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [num, setNum] = useQueryParam("orderId", NumberParam)

  useEffect(() => {
    console.log(num)
    dispatch(orderAction.payForOrder({ id: num }))
  }, [])

  return (
    <PageWrapper>
      <FormWrapper>
        <TaskAltIcon sx={{color: "#00BF63", fontSize: "5rem"}}/>
        <h2>Order Success</h2>
        <h4>
          Thank you for choosing our delivery service! We appreciate your order.
        </h4>
        <h3>Have A Greate Day!</h3>
        <ButtonMain
          type="button"
          buttonName="GO TO HOME"
          onClick={() => navigate("/")}
        />
      </FormWrapper>
    </PageWrapper>
  )
}

export default PaymentSuccess
