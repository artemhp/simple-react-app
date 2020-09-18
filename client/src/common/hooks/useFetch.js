import { useState, useEffect, useCallback } from 'react';

export default function useFetchData(serverRequest, options = {}) {
  const { onMount, payload } = options;
  const [data, setData] = useState();
  const [status, setStatus] = useState({
    status: null,
    details: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const init = (sendServerRequest, successCallback, errorCallback) => {
    setIsLoading(true);
    sendServerRequest
      .then(dataFromServer => {
        setData(dataFromServer);
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

  const getCachedSend = useCallback(send, []);
  useEffect(() => {
    if (onMount) {
      getCachedSend(payload);
    }
  }, [payload, onMount, getCachedSend]);

  return {
    status,
    data,
    send,
    isLoading,
  };
}
