import React from "react";
import PropTypes from "prop-types";
import formatDate from "../common/utils/formatDate";

UserCard.propTypes = {};

function UserCard({ data }) {
  return (
    <div className="columns">
      {data.image && (
        <div className="column is-two-fifths">
          <img src={data.image} alt="" />
        </div>
      )}
      <div className="column">
        {data.userName && <p className="title">{data.userName}</p>}
        {data.userDob && <p className="subtitle">{formatDate(data.userDob)}</p>}
        {data.userEmail && (
          <p>
            <span className="icon">
              <i className="fas fa-envelope"></i>
            </span>
            {data.userEmail}
          </p>
        )}
        {data.userPhone && (
          <p>
            <span className="icon">
              <i className="fas fa-phone"></i>
            </span>
            {data.userPhone}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserCard;
