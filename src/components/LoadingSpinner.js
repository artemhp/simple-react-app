import React, { memo } from "react";
import PropTypes from "prop-types";

const LoadingSpinner = memo(({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="level is-size-1">
      <div className="level-item has-text-centered">
        <div className="loader is-loading"></div>
      </div>
    </div>
  );
});

LoadingSpinner.propTypes = {};

export default LoadingSpinner;
