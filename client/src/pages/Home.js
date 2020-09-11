import React, { useEffect, useState } from 'react';
import getList from '../common/api/getUser';
import useFetch from '../common/hooks/useFetch';

import Table from '../components/Table';
import LoadingSpinner from '../components/LoadingSpinner';
import RequestStatus from '../components/RequestStatus';
import Chart from '../components/Chart';

function Home() {
  const { data, isLoading, status, send } = useFetch(getList);
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    if (data) {
      setUserData(data.slice(-10));
    }
  }, [data]);

  useEffect(() => {
    send();
  }, []);

  const updateData = info => {
    setUserData(info);
  };

  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {!!userData && !!userData.length && (
        <div className="columns">
          <div className="column">
            <Chart data={userData} />
          </div>
          <div className="column">
            <Table data={userData} updateData={updateData} />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
