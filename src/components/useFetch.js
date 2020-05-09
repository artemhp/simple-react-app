import React, { useState, useEffect } from "react";

export default function useFetchData(postData, defaultData) {
  const [data, setData] = useState(defaultData);
  const [status, setStatus] = useState({
    status: null,
    details: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = (postData, successCallback, errorCallback) => {
    setIsLoading(true);
    postData
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
    if (postData) {
      fetchData(postData());
    }
  }, [postData]);

  return {
    fetchData,
    status,
    data,
    isLoading,
  };
}
