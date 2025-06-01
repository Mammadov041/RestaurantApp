import Form from "../../layouts/Form";
import ReplayIcon from "@mui/icons-material/Replay";
import ReorderIcon from "@mui/icons-material/Reorder";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  ButtonGroup,
  Button as MuiButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Button, Input, Select } from "../../controls/index";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { createApiEndpoint, END_POINTS } from "../../api/index";
import { roundTo2DecimalPoint } from "../../utils";
import Popup from "../../layouts/Popup";
import OrderList from "./OrderList";
import Notification from "../../layouts/Notification";

const paymentMethods = [
  { id: "Cash", title: "By Cash" },
  { id: "Card", title: "By Credit Card" },
];

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    "& .MuiTypography-root": {
      fontSize: "1.5rem",
      color: "#f3b33d",
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#f3b33d",
    color: "#000",
    margin: "8px",
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: "#f3b33d",
    },
  },
}));

export default function OrderForm(props) {
  const {
    values,
    errors,
    handleInputChange,
    setValues,
    setErrors,
    resetFormControls,
  } = props;
  const [customerList, setCustomerList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false });
  const [orderId, setOrderId] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    createApiEndpoint(END_POINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        // Assuming you want to set the customer options in a state
        // setCustomerOptions(res.data);
        let customerList = res.data.map((customer) => ({
          id: customer.id,
          title: customer.name,
        }));
        customerList = [{ id: 0, title: "Select" }, ...customerList];
        setCustomerList(customerList);
        console.log("Fetched customers:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
      });
  }, []);

  useEffect(() => {
    // update gTotal when orderDetails change
    const gTotal = values.orderDetails.reduce(
      (acc, item) => acc + item.quantity * item.foodItemPrice,
      0
    );
    setValues((prevValues) => ({
      ...values,
      gTotal: roundTo2DecimalPoint(gTotal),
    }));
  }, [values.orderDetails]);

  useEffect(() => {
    if (orderId === 0) {
      resetFormControls();
    } else {
      createApiEndpoint(END_POINTS.ORDER)
        .fetchById(orderId)
        .then((res) => {
          setValues(res.data);
          setErrors({});
        })
        .catch((err) => {
          console.error("Error fetching order:", err);
        });
    }
  }, [orderId]);

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId ? "" : "This field is required.";
    temp.pMethod =
      values.pMethod !== "None" || "" ? "" : "This field is required.";
    temp.orderDetails =
      values.orderDetails.length > 0
        ? ""
        : "At least one food item is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (values.id === 0) {
        createApiEndpoint(END_POINTS.ORDER)
          .create(values)
          .then((res) => {
            setNotify({
              isOpen: true,
              message: "Order Master created successfully",
              type: "success",
            });
            resetFormControls();
          })
          .catch((err) => {
            console.error("Error creating order master:", err);
            console.log(values);
          });
      } else {
        createApiEndpoint(END_POINTS.ORDER)
          .update(values.id, values)
          .then((res) => {
            setNotify({
              isOpen: true,
              message: "Order Master updated successfully",
              type: "success",
            });
            setOrderId(0);
          })
          .catch((err) => {
            console.error("Error updating order master :", err);
            console.log(values);
          });
      }
    }
  };

  // const [values, setValues] = useState(getFreshModelObject());
  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };
  // const resetFormControls = () => {
  //   setValues(getFreshModelObject());
  // };

  return (
    <>
      <Form onSubmit={submitOrder}>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Input
              disabled
              value={values.orderNumber}
              label="Order Number"
              name="orderNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className={classes.adornmentText}
                    position="start"
                  >
                    #
                  </InputAdornment>
                ),
              }}
            />
            <Select
              onChange={handleInputChange}
              label="Customer"
              name="customerId"
              value={values.customerId}
              options={customerList}
              error={errors.customerId}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Input
              value={values.gTotal}
              label="Grand Total"
              name="gTotal"
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    className={classes.adornmentText}
                    position="start"
                  >
                    $
                  </InputAdornment>
                ),
              }}
            />
            <Select
              onChange={handleInputChange}
              label="Payment Method"
              name="pMethod"
              value={values.pMethod}
              options={paymentMethods}
              error={errors.pMethod}
            />
            <ButtonGroup className={classes.submitButtonGroup}>
              <MuiButton
                size="large"
                type="submit"
                endIcon={<RestaurantIcon />}
              >
                Submit Order
              </MuiButton>
              <MuiButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOrderId(0);
                  resetFormControls();
                }}
                size="small"
                type="submit"
                startIcon={<ReplayIcon />}
              />
            </ButtonGroup>
            <Button
              onClick={() => setOrderListVisibility(true)}
              size="large"
              startIcon={<ReorderIcon />}
            >
              My Orders
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Popup
        title="List of Orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
      >
        <OrderList {...{ setOrderId, setOrderListVisibility }} />
      </Popup>
      <Notification {...{ notify, setNotify }} />
    </>
  );
}
