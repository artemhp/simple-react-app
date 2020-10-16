import React from 'react';
import PropTypes from 'prop-types';

function RequestStatus({ status, customErrorMessage }) {
  if (status.status === 'error') {
    return (
      <div className="notification is-danger">
        {!customErrorMessage ?
          <>
          <button type="button" className="delete" />
          Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.{' '}
          <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit
          amet fringilla. Nullam gravida purus diam, et dictum <a href="https://google.com">felis venenatis</a> efficitur. Sit amet, consectetur
          adipiscing elit
          </>
        : customErrorMessage
        }
      </div>
    );
  }
  return null;
}

RequestStatus.propTypes = {
  status: PropTypes.object,
};

export default RequestStatus;
