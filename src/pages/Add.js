import React, {useReducer} from "react";
import PropTypes from "prop-types";

Add.propTypes = {};

const initValue = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userDob: '',
};

const reducer = (state, {field, value}) => ({ ...state, [field]: value });

function Add (props) {
  const [state, dispatch] = useReducer(reducer, initValue);
  const {userDob, userEmail, userName, userPhone} = state;

  const handleSubmit = (event) => {
    console.log(state);
    event.preventDefault();
  };

  const handleInputChange = (event) => dispatch({
      field: event.target.name,
      value: event.target.value
  })

  return (
    <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="userName" value={userName} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="userEmail" value={userEmail} onChange={handleInputChange} />
        </label>
        <label>
          Phone:
          <input type="tel" name="userPhone" value={userPhone} onChange={handleInputChange} />
        </label>
        <label>
          DoB:
          <input type="date" name="userDob" value={userDob} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
    </form>
  );
}

export default Add;
