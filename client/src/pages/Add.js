import React from 'react';

import postUser from '../common/api/postUser';
import StatusForm from '../common/form/StatusForm';
import useForm from '../common/hooks/useForm';
import useFetch from '../common/hooks/useFetch';
import InputForm from '../common/form/controls/InputForm';
import UserCard from '../components/UserCard';

// Set init value for fields that will be in use in the form that is located on this view.
const initValue = {
  name: '',
  owl: '',
  rate: '',
  dob: '',
  image: '',
  house: '',
};

function Add() {
  // handleInputChange - an action dispatcher for setting values in the form for specific field.
  // handleReset - for resetting form.
  // state - state of the form. Will use it for sending on server.
  const { handleInputChange, handleReset, state } = useForm(initValue);
  const { dob, owl, name, rate, image, house } = state;

  const { status, isLoading, send } = useFetch(postUser);

  const submit = event => {
    event.preventDefault();
    send(state);
  };

  return (
    <>
      {!isLoading && <StatusForm formSubmitStatus={status} />}
      <form onSubmit={submit}>
        <div className="columns">
          <div className="column is-two-fifths">
            <InputForm placeholder="Name" required name="name" value={name} type="text" onChange={handleInputChange} />
            <InputForm
              placeholder="House"
              required
              name="house"
              value={house}
              type="select"
              options={['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']}
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Owl (email)"
              required
              name="owl"
              value={owl}
              type="email"
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Initial points"
              required
              name="rate"
              value={rate}
              type="tel"
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Date of Birth"
              required
              name="dob"
              value={dob}
              type="date"
              onChange={handleInputChange}
            />
            <InputForm
              placeholder="Photo"
              required
              name="image"
              value={image}
              type="url"
              onChange={handleInputChange}
            />
            <div className="field is-grouped">
              <div className="control">
                <button type="submit" className={isLoading ? 'button is-link is-loading ' : 'button is-link'}>
                  Submit
                </button>
              </div>
              <div className="control">
                <button onClick={handleReset} className="button is-link is-light">
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="column">
            {!Object.values(state).filter(el => el).length && (
              <div className="container">
                <p className="title">Start typing in the form</p>
                <p className="subtitle">and you will see a preview</p>
              </div>
            )}

            {!!Object.values(state).filter(el => el).length && (
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
    </>
  );
}

export default Add;
