import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import useFetch from '../common/hooks/useFetch';
import getList from '../common/api/getUser';
import RequestStatus from './RequestStatus';
import LoadingSpinner from './LoadingSpinner';
import UserCard from './UserCard';

Details.propTypes = {};

function Details({ backTo }) {
  const { id } = useParams();
  const history = useHistory();

  const { isLoading, data, status, send } = useFetch(getList);

  useEffect(() => {
    send(id);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Details</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              history.push(backTo);
            }}
          />
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
