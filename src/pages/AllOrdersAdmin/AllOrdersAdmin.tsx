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

export function getNormalDateAndTimeFromOrderObject(dateInString: string) {
  const year: string = dateInString?.slice(0, 4)
  const month: string = dateInString?.slice(5, 7)
  const day: string = dateInString?.slice(8, 10)
  const hours: string = dateInString?.slice(11, 13)
  const minutes: string = dateInString?.slice(14, 16)
  if (dateInString) {
    return `${day}.${month}.${year} ${hours}:${minutes} `
  } else return ""
}

function AllOrdersAdmin() {
  const dispatch = useAppDispatch()

  const { ordersAdmin } = useAppSelector(orderSelector.orderState)
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      type: "number",
      width: 50,
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
      width: 170,
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
      width: 170,
    },
    {
      field: "orderStatus",
      headerName: "Order status",
      type: "string",
      width: 110,
    },
    {
      field: "totalSum",
      headerName: "Total sum",
      type: "number",
      width: 100,
    },
  ]

  const rows = ordersAdmin.map((obj: orderObject) => {
    return {
      id: obj.id,
      userId: obj.userId,
      orderTime: getNormalDateAndTimeFromOrderObject(obj.orderTime),
      address: obj.address,
      deliveryTime: getNormalDateAndTimeFromOrderObject(obj.deliveryTime),
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
        <h1>All orders</h1>
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
        <ScrollUpArrowButton />
      </ScrollUpButtonWrapper>
    </PageWrapper>
  )
}

export default AllOrdersAdmin
