import React, { Fragment } from "react";
import PropTypes from "prop-types";

import postUser from "../common/api/postUser";
import StatusForm from "../components/form/StatusForm";
import useForm from "../common/useForm";
import useFetch from "../common/useFetch";
import InputForm from "../components/form/controls/InputForm";
import UserCard from "../components/UserCard";

Add.propTypes = {};

// Set init value for fields that will be in use in the form that is located on this view.
const initValue = {
  name: "",
  owl: "",
  rate: "",
  dob: "",
  image: "",
  house: "",
};

function Add(props) {

  // handleInputChange - an action dispatcher for setting values in the form for specific field.
  // handleReset - for resetting form.
  // state - state of the form. Will use it for sending on server.
  const { handleInputChange, handleReset, state } = useForm(initValue);
  const { dob, owl, name, rate, image, house } = state;

  const { status, isLoading, send } = useFetch(postUser);

  const submit = (event) => {
    event.preventDefault();
    send(state);
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
              name="name"
              value={name}
              type="text"
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="House"
              required={true}
              name="house"
              value={house}
              type="select"
              options={["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]}
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Owl (email)"
              required={true}
              name="owl"
              value={owl}
              type="email"
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Initial points"
              required={true}
              name="rate"
              value={rate}
              type="tel"
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Date of Birth"
              required={true}
              name="dob"
              value={dob}
              type="date"
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Photo"
              required={true}
              name="image"
              value={image}
              type="url"
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
                    name: state.name,
                    rate: state.rate,
                    owl: state.owl,
                    dob: state.dob,
                    house: state.house,
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
