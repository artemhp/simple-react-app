import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Footer } from './components/Footer';

import Add from './pages/Add';
import List from './pages/List';
import About from './pages/About';
import Home from './pages/Home';

import 'bulma/css/bulma.css';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar is-dark is-spaced" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img
                alt=""
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                width="45"
                height="40"
              />
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <Link className="navbar-item" to="/add">
                Add
              </Link>
              <Link className="navbar-item" to="/list">
                List
              </Link>
              <Link className="navbar-item" to="/about">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/list">
              <List />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
