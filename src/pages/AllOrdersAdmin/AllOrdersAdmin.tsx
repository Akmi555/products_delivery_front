import { useAppDispatch, useAppSelector } from "store/hooks"
import { orderAction, orderSelector } from "store/redux/order/orderSlice"

import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import { useEffect } from "react"
import { orderObject } from "store/redux/order/types"
import {
  GoBackButtonWrapper,
  PageWrapper,
  ScrollUpButtonWrapper,
} from "./styles"
import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"

function AllOrdersAdmin() {
  const dispatch = useAppDispatch()

  const { ordersAdmin } = useAppSelector(orderSelector.orderState)

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      type: "number",
      width: 80,
    },
    {
      field: "userId",
      headerName: "User Id",
      type: "number",
      width: 80,
    },
    {
      field: "orderTime",
      headerName: "Order time",
      type: "string",
      width: 173,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 250,
    },
    {
      field: "deliveryTime",
      headerName: "Delivery time",
      type: "string",
      width: 250,
    },
    {
      field: "orderStatus",
      headerName: "Order status",
      type: "string",
      width: 150,
    },
    {
      field: "totalSum",
      headerName: "Total sum",
      type: "number",
      width: 100,
    },
  ]
  const rows = ordersAdmin.map((obj: orderObject) => {
    const orderTime: string = obj.orderTime
    const year: number = Number(orderTime.slice(0, 4))
    const month: number = Number(orderTime.slice(5, 7))
    const day: number = Number(orderTime.slice(8, 10))
    const hours: number = Number(orderTime.slice(11, 13))
    const minutes: number = Number(orderTime.slice(14, 16))
  
    const deliveryTime: string = String(obj.deliveryTime)
    const yearDeliveryTime: number = Number(deliveryTime.slice(0, 4))
    const monthDeliveryTime: number = Number(deliveryTime.slice(5, 7))
    const dayDeliveryTime: number = Number(deliveryTime.slice(8, 10))
    const hoursDeliveryTime: number = Number(deliveryTime.slice(11, 13))
    const minutesDeliveryTime: number = Number(deliveryTime.slice(14, 16))

    return {
      id: obj.id,
      userId: obj.userId,
      // orderTime: obj.orderTime,
      orderTime:`${day}.${month}.${year} ${hours}: ${minutes} `,
      address: obj.address,
      deliveryTime: `${dayDeliveryTime}.${monthDeliveryTime}.${yearDeliveryTime} ${hoursDeliveryTime}: ${minutesDeliveryTime}`,
      orderStatus: obj.orderStatus,
      totalSum: obj.totalSum,
    }
  })

  useEffect(() => {
    dispatch(orderAction.getOrdersAdmin())
  }, [])

  const paginationModel = { page: 0, pageSize: 10 }
  return (
    <PageWrapper>
      <GoBackButtonWrapper>
        <GoBackArrowButton />
      </GoBackButtonWrapper>

      <Paper sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      <ScrollUpButtonWrapper>
        <ScrollUpArrowButton/>
      </ScrollUpButtonWrapper>
    </PageWrapper>
  )
}

export default AllOrdersAdmin
