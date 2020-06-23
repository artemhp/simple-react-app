import React, { Fragment } from "react";
import PropTypes from "prop-types";

import postUser from "../common/api/postUser";
import StatusForm from "../components/form/StatusForm";
import useFormState from "../components/form/useFormState";
import useFetchData from "../common/useFetch";
import InputForm from "../components/form/controlls/InputForm";
import UserCard from "../components/UserCard";

Add.propTypes = {};

const initValue = {
  userName: "",
  userEmail: "",
  userPhone: "",
  userDob: "",
  image: "",
};

function Add(props) {
  const { handleInputChange, handleReset, state } = useFormState(initValue);
  const { fetchData, status, isLoading } = useFetchData();
  const { userDob, userEmail, userName, userPhone, image } = state;

  const submit = (event) => {
    event.preventDefault();
    debugger;
    fetchData(postUser(state));
  };

  return (
    <Fragment>
      {!isLoading && <StatusForm formSubmitStatus={status} />}
      <form onSubmit={submit}>
        <div className="columns">
          <div className="column is-two-fifths">
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
            <InputForm
              placeholder="Image"
              required={true}
              name="image"
              value={image}
              type="text"
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
                <button
                  onClick={handleReset}
                  className="button is-link is-light"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="column">
            {!Object.values(state).filter((el) => el).length && (
              <div className="container">
                <p className="title">Start typing in the form</p>
                <p className="subtitle">and you will see a preview</p>
              </div>
            )}

            {!!Object.values(state).filter((el) => el).length && (
              <div className="box">
                <UserCard
                  data={{
                    image: state.image,
                    userName: state.userName,
                    userPhone: state.userPhone,
                    userEmail: state.userEmail,
                    userDob: state.userDob,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default Add;
