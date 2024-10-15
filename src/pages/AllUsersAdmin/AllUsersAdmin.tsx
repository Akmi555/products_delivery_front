import { useAppDispatch, useAppSelector } from "store/hooks"
import { usersAction, usersSelectors } from "store/redux/allUsers/allUsersSlice"
import { userAuthSelectors } from "store/redux/users/userAuthSlice"

import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"

import { UserObject } from "store/redux/allUsers/types"
import { useEffect, useState } from "react"
import { GoBackButtonWrapper, PageWrapper, ScrollUpButtonWrapper } from "./styles"
import { IconButton } from "@mui/material"
import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"

function AllUsers() {
  const dispatch = useAppDispatch()

  const { currentUser, accessToken } = useAppSelector(
    userAuthSelectors.userAuthState,
  )
  const currentUserID: number | undefined = currentUser?.id

  // для работы таблицы из  MUI
  const { users, totalPages } = useAppSelector(usersSelectors.usersState)
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      type: "number",
      width: 50,
    },
    {
      field: "firstName",
      headerName: "First name",
      type: "string",
      width: 100,
    },
    {
      field: "lastName",
      headerName: "Last name",
      type: "string",
      width: 100,
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
      width: 120,
    },
    {
      field: "action",
      headerName: "Delete",
      type: "actions",
      width: 70,
      renderCell(params) {
        const onClick = (e: React.MouseEvent) => {
          e.stopPropagation()
          // здесь вставить функцию удаления пользователя
          alert("User deleted")
        }
        return (
          <IconButton aria-label="delete">
            <GridDeleteIcon onClick={onClick} />
          </IconButton>
        )
      },
    },
  ]

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(20)
  const [pageQuantity, setPageQuantity] = useState<number>(1)

  const rows = users.map((obj: UserObject) => {
    return {
      id: obj.id,
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      phone: obj.phone,
      roles: obj.roles[0].authority,
    }
  })

  // const handleChange = (_: any, value: number) => {
  //   setCurrentPage(value)
  //   setPageQuantity(totalPages)
  // }

  useEffect(() => {
    dispatch(usersAction.getUsers())
  }, [currentPage, pageQuantity])

  const paginationModel = { page: 0, pageSize: 10 }
  return (
    <PageWrapper>
      <GoBackButtonWrapper>
        <GoBackArrowButton />
        <h1>All users</h1>
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

export default AllUsers
