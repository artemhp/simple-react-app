import React, { useState, useEffect } from "react";

export default function useFetchData(serverRequest, defaultData, input) {
  const [data, setData] = useState(defaultData);
  const [status, setStatus] = useState({
    status: null,
    details: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (serverRequest, successCallback, errorCallback) => {
    setIsLoading(true);
    serverRequest
      .then((data) => {
        setData(data);
        setStatus({ status: "success" });
        if (successCallback) successCallback();
      })
      .catch((error) => {
        setStatus({ status: "error", details: error });
        if (errorCallback) errorCallback();
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (serverRequest) {
      fetchData(serverRequest(input));
    }
  }, [serverRequest, input]);

  return {
    fetchData,
    status,
    data,
    isLoading,
  };
}
