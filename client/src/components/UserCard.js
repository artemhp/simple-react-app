import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../common/utils/formatDate';

function UserCard({ data }) {
  return (
    <div className="columns">
      {data.image && (
        <div className="column is-two-fifths">
          <img src={data.image} alt="" />
        </div>
      )}
      <div className="column">
        {data.name && <p className="title">{data.name}</p>}
        {data.dob && (
          <p className="subtitle">
            <strong>DoB:</strong>
            {formatDate(data.dob)}
          </p>
        )}
        {data.owl && (
          <p>
            <span className="icon">
              <i className="fas fa-envelope" />
            </span>
            {data.owl}
          </p>
        )}
        {data.house && (
          <p>
            <strong>House: </strong>
            <span>{data.house}</span>
          </p>
        )}
        {data.rate && (
          <p>
            <strong>Points: </strong>
            <span className="tag is-info">{data.rate}</span>
          </p>
        )}
      </div>
    </div>
  );
}

UserCard.propTypes = {
  data: PropTypes.object,
};

export default UserCard;
