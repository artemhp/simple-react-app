import React, { useReducer } from "react";
import useFetchData from "../../common/useFetch";

const reducer = (initValue) => (state, { field, value, action }) => {
  if (action === "RESET") {
    return initValue;
  }
  return { ...state, [field]: value };
};

export default function useForm(initValue) {
  const [state, dispatch] = useReducer(reducer(initValue), initValue);

  const handleInputChange = (event) =>
    dispatch({
      field: event.target.name,
      value: event.target.value,
    });

  const handleReset = () =>
    dispatch({
      action: "RESET",
    });

  return {
    handleInputChange,
    handleReset,
    state,
  };
}
