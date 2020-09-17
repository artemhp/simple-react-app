import React, { useEffect } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import getList from '../common/api/getUser';
import LoadingSpinner from '../components/LoadingSpinner';
import './List.css';
import useFetch from '../common/hooks/useFetch';

import Details from '../components/Details';
import RequestStatus from '../components/RequestStatus';
import List from '../components/List';

function ListPage() {
  const { isLoading, data, status, send } = useFetch(getList);

  useEffect(() => {
    send();
  }, [send]);

  const { path } = useRouteMatch();
  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {!isLoading && data && <List data={data} />}
      <Switch>
        <Route path={`${path}/:id`}>
          <Details backTo="/list" />
        </Route>
      </Switch>
    </>
  );
}

export default ListPage;
