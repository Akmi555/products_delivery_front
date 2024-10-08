import { useAppDispatch, useAppSelector } from "store/hooks"
import { usersAction, usersSelectors } from "store/redux/allUsers/allUsersSlice"

import * as React from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"

import { UserObject } from "store/redux/allUsers/types"

function AllUsers() {
  // для работы таблицы из  MUI
  const { users } = useAppSelector(usersSelectors.usersState)
  const columns: GridColDef[] = [
    { 
      field: "id", 
      headerName: "Id", 
      type: "number", 
      width: 200
    },
    {
      field: "first_name",
      headerName: "First name",
      type: "string",
      width: 200,
    },
    { 
      field: "last_name", 
      headerName: "Last name", 
      type: "string", 
      width: 200 
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "string",
      width: 200,
    },
    {
      field: "roles",
      headerName: "Roles",
      type: "string",
      width: 200,
    }
  ]

  const rows = users.map((obj: UserObject) => {
    return {
      id: obj.id,
      first_name: obj.first_name,
      last_name: obj.last_name,
      email: obj.email,
      phone: obj.phone,
    }
  })

  const paginationModel = { page: 0, pageSize: 10 }
  return (
    <Paper sx = {{height: "100%", width: "100%"}}>
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel}}}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0}}
        />
    </Paper>
  )
}

export default AllUsers