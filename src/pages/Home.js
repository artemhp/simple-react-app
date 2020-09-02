import React, { Fragment, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import getList from "../common/api/getUser";
import useFetch from "../common/useFetch";

import Table from "../components/Table";
import LoadingSpinner from "../components/LoadingSpinner";
import RequestStatus from "../components/RequestStatus";
import Chart from "../components/Chart";

Home.propTypes = {};

function Home(props) {
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

  const updateData = (data) => {
    setUserData(data);
  };

  return (
    <Fragment>
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {!!userData && !!userData.length && (
        <div className="columns">
          <div className="column">
            <Chart data={userData} />
          </div>
          <div className="column">
            {<Table data={userData} updateData={updateData} />}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Home;
