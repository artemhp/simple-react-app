import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import getList from '../common/api/getUser';
import LoadingSpinner from '../components/LoadingSpinner';
import './List.css';
import useFetch from '../common/hooks/useFetch';

import Details from '../components/Details';
import RequestStatus from '../components/RequestStatus';
import List from '../components/List';

function ListPage() {
  const { isLoading, data, status } = useFetch(getList, { onMount: true });

  const { path } = useRouteMatch();
  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {!isLoading && data && <List data={data} />}
      <Switch>
        <Route path={`/list/:id`}>
          <Details backTo="/list" />
        </Route>
      </Switch>
    </>
  );
}

export default ListPage;
