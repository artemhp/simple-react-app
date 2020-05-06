import React, {useReducer, useState} from "react";
import PropTypes from "prop-types";

import config from '../config';
import postUser from '../common/api/postUser'
import StatusForm from '../components/form/StatusForm';
import Loading from '../components/form/LoadingForm';
import useFormState from '../components/form/useFormState'

Add.propTypes = {};

const initValue = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userDob: '',
};

function Add (props) {

  const {submitData, isLoaded, formSubmitStatus, handleInputChange, state} = useFormState(initValue);
  const {userDob, userEmail, userName, userPhone} = state;

  const submit= (event) => {
    event.preventDefault();
    submitData(postUser(config, state))
  }

  return (
    <form onSubmit={submit}>
        <Loading isLoaded={isLoaded} />
        <StatusForm formSubmitStatus={formSubmitStatus} />
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
