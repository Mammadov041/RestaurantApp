import { useState } from "react";

const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
  id: 0,
  orderNumber: generateOrderNumber(),
  customerId: 0,
  pMethod: "None",
  gTotal: 0,
  orderDetails: [],
  deletedOrderItemIds: "",
});

export function useForm() {
  const [values, setValues] = useState(getFreshModelObject());
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetFormControls = () => {
    setValues(getFreshModelObject());
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  };
}
