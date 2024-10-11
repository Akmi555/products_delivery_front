import * as React from "react"
import Box from "@mui/material/Box"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { PageWrapper } from "./styles"

function Orders() {
  
  function createData(
    userId: number,
    orderTime: string,
    address: string,
    deliveryTime: string,
    orderStatus: string,
    totalSum: number,
  ) {
    return {
      userId: userId,
      orderTime: orderTime,
      address: address,
      deliveryTime: deliveryTime,
      orderStatus: orderStatus,
      totalSum: totalSum,
      productList: [
        {
          orderId: 10,
          productId: 2,
          productQuantity: 3,
          productSum: 111,
        },
        {
          orderId: 50,
          productId: 3,
          productQuantity: 1,
          productSum: 222,
        },
      ],
    }
  }

  const rows = [
    createData(
      1,
      "2020-01-05",
      "Berlin, Lindenstr.15",
      "2020-01-05 15:00",
      "SHIPPED",
      3.99,
    ),
    createData(
      2,
      "2020-01-05",
      "Berlin, Lindenstr.15",
      "2020-01-05 15:00",
      "DELIVERED",
      3.99,
    ),
    createData(
      3,
      "2020-01-05",
      "Berlin, Lindenstr.15",
      "2020-01-05 15:00",
      "PENDING",
      3.99,
    ),
    createData(
      4,
      "2020-01-05",
      "Berlin, Lindenstr.15",
      "2020-01-05 15:00",
      "PAID",
      3.99,
    ),
    createData(
      5,
      "2020-01-05",
      "Berlin, Lindenstr.15",
      "2020-01-05 15:00",
      "CANCELLED",
      3.99,
    ),
  ]

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props
    const [open, setOpen] = React.useState(false)

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.userId}
          </TableCell>
          <TableCell align="right">{row.orderTime}</TableCell>
          <TableCell align="right">{row.address}</TableCell>
          <TableCell align="right">{row.deliveryTime}</TableCell>
          <TableCell align="right">{row.orderStatus}</TableCell>
          <TableCell align="right">{row.totalSum}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Product list
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order Id</TableCell>
                      <TableCell>Product Id</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.productList.map(productListRow => (
                      <TableRow key={productListRow.orderId}>
                        <TableCell component="th" scope="row">
                          {productListRow.orderId}
                        </TableCell>
                        <TableCell>{productListRow.productId}</TableCell>
                        <TableCell align="right">
                          {productListRow.productQuantity}
                        </TableCell>
                        <TableCell align="right">
                          {productListRow.productSum}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  return (
    <PageWrapper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>User Id</TableCell>
              <TableCell align="right">Order time</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Delivery time</TableCell>
              <TableCell align="right">Order status</TableCell>
              <TableCell align="right">Total sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <Row key={row.userId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageWrapper>
  )
}

export default Orders
