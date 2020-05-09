import React, { useReducer } from "react";
import useFetchData from "../useFetch";

const reducer = (initValue) => (state, { field, value, action }) => {
  if (action === "RESET") {
    return initValue;
  }
  return { ...state, [field]: value };
};

export default function useFormState(initValue) {
  const [state, dispatch] = useReducer(reducer(initValue), initValue);
  const { fetchData, status, isLoading } = useFetchData();

  const submitData = (postData, successCallback, errorCallback) => {
    fetchData(postData, successCallback, errorCallback);
  };

  const handleInputChange = (event) =>
    dispatch({
      field: event.target.name,
      value: event.target.value,
    });

  return {
    submitData,
    handleInputChange,
    status,
    isLoading,
    state,
  };
}
