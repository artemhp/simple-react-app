import React from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "../common/useFetch";
import getList from "../common/api/getUser";
import RequestStatus from "./RequestStatus";
import LoadingSpinner from "./LoadingSpinner";
import formatDate from "../common/utils/formatDate";

Modal.propTypes = {};

function Modal({ backTo }) {
  let { id } = useParams();
  let history = useHistory();

  const { isLoading, data, status } = useFetch(getList, [], id);

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
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
          <div class="columns">
            <div class="column is-two-fifths">
              <img src={data.image} alt="" />
            </div>
            <div class="column">
              <p className="title">{data.userName}</p>
              <p className="subtitle">{formatDate(data.userDob)}</p>
              <p>
                <span className="icon">
                  <i className="fas fa-envelope"></i>
                </span>
                {data.userEmail}
              </p>
              <p>
                <span className="icon">
                  <i className="fas fa-phone"></i>
                </span>
                {data.userPhone}
              </p>
            </div>
          </div>
          <div class="columns" class="has-background-light">
            <div class="column">{data.story}</div>
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

export default Modal;
