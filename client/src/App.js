import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import fetchIntercept from 'fetch-intercept';
import { useHistory } from 'react-router-dom';
import PrivateRoute from './common/routes/PrivateRoute'

import Add from './pages/Add';
import List from './pages/List';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';

import useAuth from './common/hooks/useAuth';

import 'bulma/css/bulma.css';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const getToken = (token, redirect) => {
    if (!token) {
        return false;
    }
    fetchIntercept.register({
    request: (url, config) => ([url, {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }]),
    });
    setIsAuth(true);
    redirect();
  };

  return (
    <Router>
      <Header isAuth={isAuth} />
      <main>
        <div className="container">
          <Switch>
            <Route path="/login">
              <Login redirectWithToken={getToken} />
            </Route>
            <Route isAuth={isAuth} path="/about">
              <About />
            </Route>
            <PrivateRoute isAuth={isAuth} path="/list">
              <List />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/add">
              <Add />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
