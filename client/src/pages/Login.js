import React, {useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useForm from '../common/hooks/useForm';
import InputForm from '../common/form/controls/InputForm';
import useAuth from '../common/hooks/useAuth';

export default function Login(props) {

  const location = useLocation();
  const history = useHistory();

  const { handleInputChange, handleReset, state } = useForm();
  const { isLoading, onLogin, token } = useAuth();

  useEffect(() => props.redirectWithToken(token, () => history.replace(from)), [token]);
  const { from } = location.state || { from: '/' };

  const submit = event => {
    event.preventDefault();
    onLogin(state);
  };

  return (
    <form onSubmit={submit}>
      <div className="content">
        <div>
          <InputForm placeholder="Login" required name="user" type="text" onChange={handleInputChange} />
        </div>
        <div>
          <InputForm placeholder="Password" required name="password" type="password" onChange={handleInputChange} />
        </div>
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
        <div>You must log in to view the page at {from}.</div>
      </div>
    </form>
  );
}
