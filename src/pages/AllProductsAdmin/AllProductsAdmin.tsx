import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "store/hooks"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice"
import { ProductObject } from "store/redux/allProducts/types"
import {
  productsAction,
  productsSelectors,
} from "store/redux/allProducts/allProductsSlice"

import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid"
import { Paper, IconButton } from "@mui/material"

import GoBackArrowButton from "components/GoBackArrowButton/GoBackArrowButton"
import ScrollUpArrowButton from "components/ScrollUpArrowButton/ScrollUpArrowButton"
import ProgressCircle from "components/ProgressCircle/ProgressCircle"

import {
  GoBackButtonWrapper,
  PageWrapper,
  ScrollUpButtonWrapper,
} from "./styles"
import { ToastContainer, toast } from "react-toastify"

function AllProductsAdmin() {
  const [currentPage] = useState<number>(1)
  const [pageSize] = useState<number>(20)
  const [pageQuantity] = useState<number>(1)
  const dispatch = useAppDispatch()
  const { products, isPending } = useAppSelector(
    productsSelectors.productsState,
  )
  const notifyRejected = () =>
    toast.error("Failed to delete user", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  const notifyFulfilled = () =>
    toast.success("User was successfully deleted", {
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
      headerName: "ID",
      type: "number",
      width: 50,
    },
    {
      field: "title",
      headerName: "Title",
      type: "string",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 50,
    },
    {
      field: "minQuantity",
      headerName: "Min Quantity",
      type: "string",
      width: 100,
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
            oneProductAction.deleteProductFromDB(params.row.id),
          )
          if (
            oneProductAction.deleteProductFromDB.fulfilled.match(dispatchResult)
          ) {
            notifyFulfilled()
          }
          if (
            oneProductAction.deleteProductFromDB.rejected.match(dispatchResult)
          ) {
            notifyRejected()
          }
        }
        return (
          <IconButton>
            <GridDeleteIcon onClick={onClick} />
          </IconButton>
        )
      },
    },
  ]

  const rows = products.map((obj: ProductObject) => {
    return {
      id: obj.id,
      title: obj.title,
      price: obj.price,
      minQuantity: obj.minQuantity,
    }
  })

  useEffect(() => {
    dispatch(
      productsAction.getProducts({
        currentPage: currentPage,
        pageSize: pageSize,
      }),
    )
  }, [currentPage, pageQuantity])

  const paginationModel = { page: 0, pageSize: 10 }
  return (
    <PageWrapper>
      <ToastContainer />
      <GoBackButtonWrapper>
        <GoBackArrowButton />
        <h1>All products</h1>
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

export default AllProductsAdmin
