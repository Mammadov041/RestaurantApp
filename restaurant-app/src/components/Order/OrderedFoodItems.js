import {
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { roundTo2DecimalPoint } from "../../utils";
import ClearIcon from "@mui/icons-material/Clear";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    margin: "15px 0px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $deleteButton": {
      display: "block",
    },
  },
  buttonGroup: {
    backgroundColor: "#E3E3E3",
    borderRadius: 8,
    "& .MuiButtonBase-root ": {
      border: "none",
      minWidth: "25px",
      padding: "1px",
    },
    "& button:nth-child(2)": {
      fontSize: "1.2em",
      color: "#000",
    },
  },
  deleteButton: {
    display: "none",
    "& .MuiButtonBase-root": {
      color: "#E81719",
    },
  },
  totalPerItem: {
    fontWeight: "bolder",
    fontSize: "1.2em",
    margin: "0px 10px",
  },
}));

export default function OrderedFoodItems(props) {
  const classes = useStyles();
  const { values, setValues } = props;

  const deleteFoodItem = (index, id) => {
    let orderMaster = { ...values };
    orderMaster.orderDetails = orderMaster.orderDetails.filter(
      (_, i) => i !== index
    );
    if (id !== 0) {
      orderMaster.deletedOrderItemIds += id + ",";
    }
    setValues({
      ...orderMaster,
    });
  };

  const updateQuantity = (index, value) => {
    if (values.orderDetails[index].quantity + value > 0) {
      setValues({
        ...values,
        orderDetails: values.orderDetails.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              quantity: Math.max(1, item.quantity + value), // Ensure quantity is at least 1
            };
          }
          return item;
        }),
      });
    }
  };

  return (
    <List>
      {values.orderDetails.length === 0 && (
        <ListItem>
          <ListItemText
            primary="No food items added to the order."
            secondary="Please add food items to proceed."
          />
        </ListItem>
      )}
      {values.orderDetails.map((item, index) => (
        <Paper key={index} className={classes.paperRoot}>
          <ListItem>
            <ListItemText
              primary={item.foodItemName}
              secondary={`$${item.foodItemPrice}`}
            />
            <ListItemText
              className={classes.totalPerItem}
              primary={`Total: $${roundTo2DecimalPoint(
                item.foodItemPrice * item.quantity
              )}`}
              secondary={
                <Typography component="span">
                  <ButtonGroup size="small" className={classes.buttonGroup}>
                    <Button
                      disabled={item.quantity === 1}
                      onClick={() => updateQuantity(index, -1)}
                    >
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={() => updateQuantity(index, 1)}>+</Button>
                  </ButtonGroup>
                </Typography>
              }
            />

            <IconButton
              className={classes.deleteButton}
              disableRipple
              onClick={() => deleteFoodItem(index, item.id)}
            >
              <ClearIcon />
            </IconButton>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
