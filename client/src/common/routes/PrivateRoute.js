import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ children, isAuth, location }) {
  return (
    <Route>
      {isAuth ? children : <Redirect  to={{
        pathname: "/login",
        state: { from: location.pathname }
      }} />}
    </Route>
  );
}