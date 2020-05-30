import React, { Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import getList from "../common/api/getUser";
import useFetch from "../common/useFetch";

import Table from "../components/Table";
import LoadingSpinner from "../components/LoadingSpinner";
import RequestStatus from "../components/RequestStatus";
import Chart from "../components/Chart";

Home.propTypes = {};

function Home(props) {
  const { data, isLoading, status } = useFetch(getList, []);
  return (
    <Fragment>
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      <div className="columns">
        <div className="column">
          <Chart data={data} />
        </div>
        <div className="column">
          <Table data={data} />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
