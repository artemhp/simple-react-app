import { useReducer } from 'react';

const reducer = initValue => (state, { field, value, action }) => {
  if (action === 'RESET') {
    return initValue;
  }
  return { ...state, [field]: value };
};

export default function useForm(initValue) {
  const [state, dispatch] = useReducer(reducer(initValue), initValue);

  const handleInputChange = event => {
    return dispatch({
      field: event.target.name,
      value: event.target.value,
    });
  };

  const handleReset = () => {
    return dispatch({
      action: 'RESET',
    });
  };

  return {
    handleInputChange,
    handleReset,
    state,
  };
}
