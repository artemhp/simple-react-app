import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import getList from "../common/api/getUser";
import LoadingSpinner from "../components/LoadingSpinner";
import "./List.css";
import useFetch from "../components/useFetch";

List.propTypes = {};

function List(props) {
  const { isLoading, data } = useFetch(getList, []);

  const formatDate = (date) => new Date(date).toLocaleDateString();

  const getContent = () => {
    return (
      <div className="columns is-multiline">
        {data.map((el, index) => (
          <div key={index} className="column is-one-quarter">
            <a href="#">
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
                    <span class="icon">
                      <i class="fas fa-envelope"></i>
                    </span>
                    {el.userEmail}
                  </p>
                  <p>
                    <span class="icon">
                      <i class="fas fa-phone"></i>
                    </span>
                    {el.userPhone}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <LoadingSpinner isLoading={isLoading} />
      {!isLoading && getContent()}
    </div>
  );
}

export default List;
