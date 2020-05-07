import React, {useReducer, useState} from "react";
import PropTypes from "prop-types";

import config from '../config';
import postUser from '../common/api/postUser'
import StatusForm from '../components/form/StatusForm';
import Loading from '../components/form/LoadingForm';
import useFormState from '../components/form/useFormState';
import InputForm from '../components/form/controlls/InputForm';

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
        <InputForm placeholder="Name" required={true} name="userName" value={userName} type="text" onChange={handleInputChange} />
        <InputForm placeholder="Email" required={true} name="userEmail" value={userEmail} type="email" onChange={handleInputChange} />
        <InputForm placeholder="Phone" required={true} name="userPhone" value={userPhone} type="tel" onChange={handleInputChange} />
        <InputForm placeholder="DoB" required={true} name="userDob" value={userDob} type="date" onChange={handleInputChange} />
        <div class="field is-grouped">
          <div class="control">
            <button type="submit" class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-link is-light">Reset</button>
          </div>
        </div>
    </form>
  );
}

export default Add;
