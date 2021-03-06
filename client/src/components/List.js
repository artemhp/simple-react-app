import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatDate from '../common/utils/formatDate';

function List({ data }) {
  const { url } = useRouteMatch();
  return (
    <div className="columns is-multiline">
      {data.map(el => (
        <div key={el.id} className="column is-one-quarter">
          <Link to={`list/${el.id}`}>
            <div className="card">
              <div className="card-image">
                <figure
                  className="image is-4by3 is-custom-img-ratio"
                  style={{
                    backgroundImage: `url(${el.image})`,
                  }}
                />
              </div>
              <div className="card-content">
                <p className="title">{el.name}</p>
                <p className="subtitle">
                  <strong>DoB:</strong> {formatDate(el.dob)}
                </p>
                <p>
                  <strong>House:</strong> {el.house}
                </p>
                <p>
                  <span className="icon">
                    <i className="fas fa-envelope" />
                  </span>
                  {el.owl}
                </p>
                <p>
                  <strong>Points: </strong>
                  <span className="tag is-info">{el.rate}</span>
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  data: PropTypes.array,
};

export default List;
