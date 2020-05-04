import React, {useReducer, useState} from "react";
import PropTypes from "prop-types";

import config from '../config';

Add.propTypes = {};

const initValue = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userDob: '',
};

const reducer = (state, {field, value, action}) => {
  if (action === 'RESET') {
    return initValue;
  }
  return ({ ...state, [field]: value })
};

function Add (props) {

  const [formSubmitStatus, setFormSubmitStatus] = useState({
    status: null
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const [state, dispatch] = useReducer(reducer, initValue);
  const {userDob, userEmail, userName, userPhone} = state;

  const handleSubmit = (event) => {
    setIsLoaded(true);
    fetch(config.backend, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    }).then(res => res.json()).then((result) => {
      setFormSubmitStatus({
        status: 'success'
      })
      console.log(result, 'API');
      dispatch({
          action: 'RESET'
      })
    }, (error) => {
      setFormSubmitStatus({
        status: 'error',
        errorDetails: error
      })
    }).finally(()=>{
      setIsLoaded(false);

    });
    event.preventDefault();
  };

  const handleInputChange = (event) => dispatch({
      field: event.target.name,
      value: event.target.value
  })

  const showFormStatus = () => {
    if (!formSubmitStatus.status) { return null; }
    return <section> {formSubmitStatus.status} </section>
  }

  return (
    <form onSubmit={handleSubmit}>
        {isLoaded && 'Loading'}
        {showFormStatus()}
        <label>
          Name:
          <input type="text" required name="userName" value={userName} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" required name="userEmail" value={userEmail} onChange={handleInputChange} />
        </label>
        <label>
          Phone:
          <input type="tel" required name="userPhone" value={userPhone} onChange={handleInputChange} />
        </label>
        <label>
          DoB:
          <input type="date" required name="userDob" value={userDob} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
    </form>
  );
}

export default Add;
