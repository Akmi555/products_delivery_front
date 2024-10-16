import { getNormalDateAndTimeFromOrderObject } from "pages/AllOrdersAdmin/AllOrdersAdmin"
import { DataContainer, OrderWrapper, OrderWrapper2 } from "./styles"
import { orderObjDataProps } from "./types"
// для раскрывающегося списка
import Accordion from "@mui/material/Accordion"
import AccordionActions from "@mui/material/AccordionActions"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"

function Order({ orderObjData }: orderObjDataProps) {
  return (
    <>
      {/* <OrderWrapper>
        <DataContainer>
          {getNormalDateAndTimeFromOrderObject(orderObjData.orderTime)}
        </DataContainer>
        <DataContainer> {orderObjData.address}</DataContainer>
        <DataContainer>
          {getNormalDateAndTimeFromOrderObject(orderObjData.deliveryTime)}
        </DataContainer>
        <DataContainer> {orderObjData.totalSum}</DataContainer>
        <DataContainer> {orderObjData.orderStatus}</DataContainer>
      </OrderWrapper> */}












      <OrderWrapper2>

      <Accordion sx={{borderRadius: 50}}>
          <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >

        <DataContainer>
          {getNormalDateAndTimeFromOrderObject(orderObjData.orderTime)}
        </DataContainer>
        <DataContainer> {orderObjData.address}</DataContainer>
        <DataContainer>
          {getNormalDateAndTimeFromOrderObject(orderObjData.deliveryTime)}
        </DataContainer>
        <DataContainer> {orderObjData.totalSum}</DataContainer>
        <DataContainer> {orderObjData.orderStatus}</DataContainer>

        </AccordionSummary>
          <AccordionDetails>
            тут продукты которые есть в заказе
          </AccordionDetails>
        </Accordion>


      </OrderWrapper2>











      {/* <div>
        <Accordion>
          <AccordionSummary 
          // expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >

            </AccordionSummary>
          <AccordionDetails></AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion>
      </div> */}
    </>
  )
}

export default Order
