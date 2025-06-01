import OrderForm from "./OrderForm";
import { useForm } from "../../hooks/useForm";
import { Grid } from "@mui/material";
import SearchFoodItems from "./SearchFoodItems";
import OrderedFoodItems from "./OrderedFoodItems";

export default function Order() {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = useForm();

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <OrderForm
          {...{
            values,
            setValues,
            errors,
            setErrors,
            handleInputChange,
            resetFormControls,
          }}
        />
      </Grid>
      <Grid container>
        <Grid size={{ xs: 6 }}>
          <SearchFoodItems {...{ values, setValues }} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <OrderedFoodItems
            {...{
              values,
              setValues,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
