import { useEffect, useState } from "react";
import { createApiEndpoint, END_POINTS } from "../../api";
import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { makeStyles } from "@mui/styles";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: "8px",
    flex: 1,
    width: "700px",
  },
  listRoot: {
    marginTop: "8px",
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
    },
    "& li:hover .MuiButtonBase-root": {
      color: "#000",
      display: "block",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default function SearchFoodItems(props) {
  const { values, setValues } = props;
  let orderedFoodItems = values.orderDetails;

  const [foodItems, setFoodItems] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const classes = useStyles();

  const addFoodItem = (foodItem) => {
    const orderDetail = {
      id: 0,
      orderMasterId: 0,
      foodItemId: foodItem.id,
      quantity: 1,
      foodItemPrice: foodItem.price,
      foodItemName: foodItem.name,
    };

    // Check if the food item exsists in the order details
    const existingOrderDetail = values.orderDetails.find(
      (item) => item.foodItemId === foodItem.id
    );

    if (existingOrderDetail) {
      // Update the quantity of the existing food item
      existingOrderDetail.quantity += 1;

      setValues((prevValues) => ({
        ...values,
        orderDetails: [...values.orderDetails],
      }));
    } else {
      setValues((prevValues) => ({
        ...values,
        orderDetails: [orderDetail, ...values.orderDetails],
      }));
    }
  };

  useEffect(() => {
    createApiEndpoint(END_POINTS.FOODITEM)
      .fetchAll()
      .then((res) => {
        setFoodItems(res.data);
        setSearchList(res.data);
      })
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  useEffect(() => {
    let copy = [...foodItems];
    copy = copy.filter((f) => {
      return f.name.toLowerCase().includes(searchKey.toLocaleLowerCase());
    });
    setSearchList(copy);
  }, [searchKey, orderedFoodItems]);

  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={classes.searchInput}
          placeholder="Search Foods"
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </Paper>
      <List className={classes.listRoot}>
        {searchList.length > 0 &&
          searchList.map((item) => (
            <ListItem key={item.id} onClick={() => addFoodItem(item)}>
              <ListItemText primary={item.name} secondary={`$${item.price}`} />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  addFoodItem(item);
                }}
              >
                <PlusOneIcon />
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
    </>
  );
}
