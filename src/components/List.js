import React from "react";
import formatDate from "../common/utils/formatDate";
import { Link, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";

List.propTypes = {};

function List({ data }) {
  let { url } = useRouteMatch();
  console.log("List Component Render");
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
}

export default List;
