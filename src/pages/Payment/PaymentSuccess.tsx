import { useAppDispatch, useAppSelector } from "store/hooks"
import { PageWrapper } from "./styles"
import { orderAction, orderSelector } from "store/redux/order/orderSlice"
import { useEffect, useState } from "react"
import { useQueryParam, NumberParam } from "use-query-params"

function PaymentSuccess() {
  const dispatch = useAppDispatch()

  const [num, setNum] = useQueryParam("orderId", NumberParam)

  //   let currentUrl = window.location.href

  useEffect(() => {
    console.log(num)
    dispatch(orderAction.payForOrder({ id: num }))
  }, [])

  return <PageWrapper>Payment Success</PageWrapper>
}

export default PaymentSuccess
