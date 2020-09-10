import React, { useState, useEffect } from 'react';

export default function useFetchData(serverRequest, defaultData, input) {
  const [data, setData] = useState(defaultData);
  const [status, setStatus] = useState({
    status: null,
    details: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const init = (serverRequest, successCallback, errorCallback) => {
    setIsLoading(true);
    serverRequest
      .then(data => {
        setData(data);
        setStatus({ status: 'success' });
        if (successCallback) successCallback();
      })
      .catch(error => {
        setStatus({ status: 'error', details: error });
        if (errorCallback) errorCallback();
      })
      .finally(() => setIsLoading(false));
  };

  const send = input => init(serverRequest(input));

  return {
    status,
    data,
    send,
    isLoading,
  };
}
