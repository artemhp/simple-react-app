import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import getList from "../common/api/getUser";
import LoadingSpinner from "../components/LoadingSpinner";
import "./List.css";
import useFetch from "../components/useFetch";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import Modal from "../components/Modal";
import RequestStatus from "../components/RequestStatus";

List.propTypes = {};

function List(props) {
  const { isLoading, data, status } = useFetch(getList, []);
  let { path, url } = useRouteMatch();

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const getContent = () => {
    return (
      <div className="columns is-multiline">
        {data.map((el) => (
          <div key={el.id} className="column is-one-quarter">
            <Link to={`${url}/${el.id}`}>
              <div className="card">
                <div className="card-image">
                  <figure
                    className="image is-4by3"
                    style={{
                      backgroundImage: `url(${el.image})`,
                    }}
                  ></figure>
                </div>
                <div className="card-content">
                  <p className="title">{el.userName}</p>
                  <p className="subtitle">{formatDate(el.userDob)}</p>
                  <p>
                    <span className="icon">
                      <i className="fas fa-envelope"></i>
                    </span>
                    {el.userEmail}
                  </p>
                  <p>
                    <span className="icon">
                      <i className="fas fa-phone"></i>
                    </span>
                    {el.userPhone}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Fragment>
      <LoadingSpinner isLoading={isLoading} />
      {!isLoading && getContent()}
      <RequestStatus status={status} />
      <Switch>
        <Route path={`${path}/:id`}>
          <Modal />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default List;
