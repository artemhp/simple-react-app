import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import useFetch from "../components/useFetch";
import getList from "../common/api/getUser";

Modal.propTypes = {};

function Modal(props) {
  let { id } = useParams();

  const { isLoading, data, status } = useFetch(getList, [], id);

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">{data.image}</section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default Modal;
