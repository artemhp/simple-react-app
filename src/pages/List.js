import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import getList from "../common/api/getUser";
import LoadingSpinner from "../components/LoadingSpinner";
import "./List.css";
import useFetch from "../common/hooks/useFetch";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Details from "../components/Details";
import RequestStatus from "../components/RequestStatus";
import List from "../components/List";

ListPage.propTypes = {};

function ListPage() {
  const { isLoading, data, status, send } = useFetch(getList);

  useEffect(() => {
    send();
  }, []);

  let { path } = useRouteMatch();
  return (
    <Fragment>
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {!isLoading && data && <List data={data} />}
      <Switch>
        <Route path={`${path}/:id`}>
          <Details backTo="/list" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default ListPage;
