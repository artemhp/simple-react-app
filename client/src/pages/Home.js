import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import getList from '../common/api/getUser';
import useFetch from '../common/hooks/useFetch';

import Table from '../components/Table';
import Dashboard from './Dashboard';
import Login from './Login';
import LoadingSpinner from '../components/LoadingSpinner';
import RequestStatus from '../components/RequestStatus';
import Chart from '../components/Chart';

function Home({isAuth}) {
  if (isAuth) {
    return <Dashboard />
  } else {
    return <Redirect to="/login" />;
  }
}

export default Home;
