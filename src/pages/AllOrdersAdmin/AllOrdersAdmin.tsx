import { useAppDispatch, useAppSelector } from "store/hooks"
import { orderAction, orderSelector } from "store/redux/order/orderSlice"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"

import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import { useEffect} from "react"
import { orderObject } from "store/redux/order/types"
import { PageWrapper } from "./styles"


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
    return {
      id: obj.id,
      userId: obj.userId,
      orderTime: obj.orderTime,
      address: obj.address,
      deliveryTime: obj.deliveryTime,
      orderStatus: obj.orderStatus,
      totalSum: obj.totalSum,
    }
  })

  useEffect(() => {
    dispatch(orderAction.getOrdersAdmin())
  },[])

  const paginationModel = { page: 0, pageSize: 10 }
  return (
    <PageWrapper>
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
    </PageWrapper>
  )
}

export default AllOrdersAdmin


