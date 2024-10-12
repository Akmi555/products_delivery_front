import { useAppDispatch, useAppSelector } from "store/hooks";
import { productsAction, productsSelectors } from "store/redux/allProducts/allProductsSlice";

import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

import { ProductObject } from "store/redux/allProducts/types";
import { useEffect, useState } from "react";
import { PageWrapper } from "./styles";
import { IconButton } from "@mui/material"
import { oneProductAction } from "store/redux/oneProduct/oneProductSlice";

function AllProductsAdmin() {
    const [allProducts, setAllProducts] = useState([])
    const dispatch = useAppDispatch()

    // const { currentProduct, accessToken } = useAppSelector()
    // const currentUserID: number | undefined = currentProduct?.id

    const { products, totalPages } = useAppSelector(productsSelectors.productsState)
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
            width: 200,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            width: 200,
        },
        {
            field: "minQuantity",
            headerName: "Min Quantity",
            type: "string",
            width: 200,
        },
        {
            field: "action",
            headerName: "Delete",
            type: "actions",
            width: 200,
            renderCell(params) {
                const onClick = (e: React.MouseEvent) => {
                    e.stopPropagation()
                    dispatch(oneProductAction.deleteProductFromDB(params.row.id))
                    
                }
                return (
                    <IconButton>
                        <GridDeleteIcon onClick={onClick} />
                        </IconButton>
                )
            },
        },
    ]

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize] = useState<number>(20)
    const [pageQuantity, setPageQuantity] = useState<number>(1)

    const rows = products.map((obj: ProductObject) => {
        return {
            id: obj.id,
            title: obj.title,
            price: obj.price,
            minQuantity: obj.minQuantity,
        }
    })

    useEffect(() => {
        dispatch(productsAction.getProducts({currentPage: currentPage, pageSize: pageSize}))
    }, [currentPage, pageQuantity])

    const paginationModel = { page: 0, pageSize: 10 }
    return (
        <PageWrapper>
            <Paper sx={{height: "100%", width: "100%" }}>
                <DataGrid
                rows={rows}
                columns={columns}
                initialState={{pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                />
            </Paper>
        </PageWrapper>
    )
}

export default AllProductsAdmin