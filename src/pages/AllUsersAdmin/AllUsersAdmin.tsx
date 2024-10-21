import { useAppDispatch, useAppSelector } from "store/hooks"
import { usersAction, usersSelectors } from "store/redux/allUsers/allUsersSlice"

import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import { IconButton } from "@mui/material"

import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"
import ProgressCircle from "components/ProgressCircle/ProgressCircle"

import { useEffect, useState } from "react"
import {
  GoBackButtonWrapper,
  PageWrapper,
  ScrollUpButtonWrapper,
} from "./styles"
import { UserObject } from "store/redux/allUsers/types"
import { ToastContainer, toast } from "react-toastify"

function AllUsers() {
  const dispatch = useAppDispatch()
  const [currentPage] = useState<number>(1)
  const [pageQuantity] = useState<number>(1)
  // для работы таблицы из  MUI
  const { users, isPending } = useAppSelector(usersSelectors.usersState)
  const notifyUserDeletedSuccessfully = () =>
    toast.success("User was deleted successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  const notifyUserDeletRejected = () =>
    toast.error("Could not delete the user", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
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
        const onClick = async (e: React.MouseEvent) => {
          e.stopPropagation()
          const dispatchResult = await dispatch(
            usersAction.deleteUser(params.row.id),
          )
          if (usersAction.deleteUser.fulfilled.match(dispatchResult)) {
            dispatch(usersAction.getUsers())
            setTimeout(() => notifyUserDeletedSuccessfully(), 500)
          }
          if (usersAction.deleteUser.rejected.match(dispatchResult)) {
            notifyUserDeletRejected()
          }
        }
        return (
          <IconButton aria-label="delete">
            <GridDeleteIcon onClick={onClick} />
          </IconButton>
        )
      },
    },
  ]

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

  useEffect(() => {
    dispatch(usersAction.getUsers())
  }, [currentPage, pageQuantity])

  const paginationModel = { page: 0, pageSize: 10 }
  return (
    <PageWrapper>
      <ToastContainer />
      <GoBackButtonWrapper>
        <GoBackArrowButton />
        <h1>All users</h1>
      </GoBackButtonWrapper>

      {isPending ? (
        <ProgressCircle />
      ) : (
        <>
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
        </>
      )}
    </PageWrapper>
  )
}

export default AllUsers
