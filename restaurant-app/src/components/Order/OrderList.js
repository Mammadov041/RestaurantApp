import { useEffect, useState } from "react";
import { createApiEndpoint, END_POINTS } from "../../api";
import Table from "../../layouts/Table";
import {
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Notification from "../../layouts/Notification";

export default function OrderList(props) {
  const { setOrderId, setOrderListVisibility } = props;
  const [orders, setOrders] = useState([]);
  const [notify, setNotify] = useState({ isOpen: false });
  useEffect(() => {
    createApiEndpoint(END_POINTS.ORDER)
      .fetchAll()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [notify]);

  const showForUpdate = (id) => {
    setOrderId(id);
    setOrderListVisibility(false);
  };

  const deleteOrderMaster = (id) => {
    createApiEndpoint(END_POINTS.ORDER)
      .delete(id)
      .then(() => {
        setNotify({
          isOpen: true,
          message: "Order deleted successfully",
          type: "success",
        });
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        setNotify({
          isOpen: true,
          message: "Failed to delete order",
          type: "error",
        });
      });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order №</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>Grand Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.orderNumber}
              onClick={() => showForUpdate(order.id)}
            >
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.pMethod}</TableCell>
              <TableCell>{order.gTotal.toFixed(2)} $</TableCell>
              <TableCell
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click event}
                }}
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOrderMaster(order.id);
                    setNotify({
                      isOpen: true,
                      message: "Order deleted successfully",
                      type: "success",
                    });
                  }}
                >
                  <RemoveCircleIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Notification {...{ setNotify, notify }} />
    </>
  );
}
