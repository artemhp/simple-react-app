import React, { memo } from "react";
import PropTypes from "prop-types";

const LoadingSpinner = memo(({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="level is-size-1">
      <p className="level-item has-text-centered">
        <div className="loader is-loading"></div>
      </p>
    </div>
  );
});

LoadingSpinner.propTypes = {};

export default LoadingSpinner;
