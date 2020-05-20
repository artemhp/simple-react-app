import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import getList from "../common/api/getUser";
import LoadingSpinner from "../components/LoadingSpinner";
import "./List.css";
import useFetch from "../common/useFetch";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import Modal from "../components/Modal";
import RequestStatus from "../components/RequestStatus";
import List from "../components/List";

ListPage.propTypes = {};

function ListPage() {
  const { isLoading, data, status } = useFetch(getList, []);
  let { path } = useRouteMatch();
  console.log("!!!");
  return (
    <Fragment>
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {!isLoading && <List data={data} />}
      <Switch>
        <Route path={`${path}/:id`}>
          <Modal backTo="/list" />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default ListPage;
