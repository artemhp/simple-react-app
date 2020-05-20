import React, { useReducer, useState, Fragment } from "react";
import PropTypes from "prop-types";

import postUser from "../common/api/postUser";
import StatusForm from "../components/form/StatusForm";
import useFormState from "../components/form/useFormState";
import InputForm from "../components/form/controlls/InputForm";

Add.propTypes = {};

const initValue = {
  userName: "",
  userEmail: "",
  userPhone: "",
  userDob: "",
};

function Add(props) {
  const {
    submitData,
    isLoading,
    status,
    handleInputChange,
    state,
  } = useFormState(initValue);
  const { userDob, userEmail, userName, userPhone } = state;

  const submit = (event) => {
    event.preventDefault();
    submitData(postUser(state));
  };

  console.log("!!!");

  return (
    <Fragment>
      {!isLoading && <StatusForm formSubmitStatus={status} />}
      <form onSubmit={submit}>
        <InputForm
          placeholder="Name"
          required={true}
          name="userName"
          value={userName}
          type="text"
          onChange={handleInputChange}
        />
        <InputForm
          placeholder="Email"
          required={true}
          name="userEmail"
          value={userEmail}
          type="email"
          onChange={handleInputChange}
        />
        <InputForm
          placeholder="Phone"
          required={true}
          name="userPhone"
          value={userPhone}
          type="tel"
          onChange={handleInputChange}
        />
        <InputForm
          placeholder="DoB"
          required={true}
          name="userDob"
          value={userDob}
          type="date"
          onChange={handleInputChange}
        />
        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              className={
                isLoading ? "button is-link is-loading " : "button is-link"
              }
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Reset</button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default Add;
