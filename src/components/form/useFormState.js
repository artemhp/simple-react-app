import React, {useReducer, useState} from "react";

const reducer = (initValue) => (state, {field, value, action}) => {
  if (action === 'RESET') {
    return initValue;
  }
  return ({ ...state, [field]: value })
};

export default function useFormState(initValue) {
  const [formSubmitStatus, setFormSubmitStatus] = useState({ status: null, error: null });
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, dispatch] = useReducer(reducer(initValue), initValue);

  const submitData = (postData, successCallback, errorCallback) => {
    setIsLoaded(true);
      postData
      .then(() => {
        setFormSubmitStatus({ status: 'success' });
        dispatch({ action: 'RESET'});
        if (successCallback) successCallback();
      })
      .catch(error => {
        setFormSubmitStatus({ status: 'error', error });
        if (errorCallback) errorCallback();
      })
      .finally(() => setIsLoaded(false));
  };

  const handleInputChange = (event) => dispatch({
      field: event.target.name,
      value: event.target.value
  })

    return {
      submitData,
      handleInputChange,
      formSubmitStatus,
      isLoaded,
      state
    };
  }