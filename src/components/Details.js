import React from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "../common/useFetch";
import getList from "../common/api/getUser";
import RequestStatus from "./RequestStatus";
import LoadingSpinner from "./LoadingSpinner";
import UserCard from "./UserCard";

Details.propTypes = {};

function Details({ backTo }) {
  let { id } = useParams();
  let history = useHistory();

  const { isLoading, data, status } = useFetch(getList, [], id);

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Details - {data.userName}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              history.push(backTo);
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <LoadingSpinner isLoading={isLoading} />
          <RequestStatus status={status} />
          <UserCard data={data} />
          <div className="columns has-background-light">
            <div className="column">{data.story}</div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button
            className="button"
            onClick={() => {
              history.push(backTo);
            }}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Details;