import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useForm from '../common/hooks/useForm';
import InputForm from '../common/form/controls/InputForm';
import RequestStatus from '../components/RequestStatus';
import useAuth from '../common/hooks/useAuth';

export default function Login(props) {
  const location = useLocation();
  const history = useHistory();

  const { handleInputChange, handleReset, state } = useForm();
  const { isLoading, onLogin, token, status } = useAuth();

  useEffect(() => {
    props.redirectWithToken(token, () => {
      history.replace(from);
    });
  }, [token]);

  const { from } = location.state || { from: { pathname: '/' } };

  const submit = event => {
    event.preventDefault();
    onLogin(state);
  };

  return (
    <div className="columns">
      <div className="column is-two-fifth">
        <RequestStatus status={status} customErrorMessage="Sorry, you are not authorized :-(" />
        <form onSubmit={submit}>
          <div className="field">
            <InputForm placeholder="Login" required name="user" type="text" onChange={handleInputChange} />
          </div>
          <div className="field">
            <InputForm placeholder="Password" required name="password" type="password" onChange={handleInputChange} />
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className={isLoading ? 'button is-link is-loading ' : 'button is-link'}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="column"></div>
    </div>
  );
}
