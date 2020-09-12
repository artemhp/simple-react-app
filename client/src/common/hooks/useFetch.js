import { useState } from 'react';

export default function useFetchData(serverRequest, defaultData) {
  const [data, setData] = useState(defaultData);
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

  return {
    status,
    data,
    send,
    isLoading,
  };
}
