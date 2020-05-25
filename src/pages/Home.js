import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js";
import getList from "../common/api/getUser";
import useFetch from "../common/useFetch";
import colors from "../common/colors";
import Table from "../components/Table";

Home.propTypes = {};

function Home(props) {
  const chartRef = useRef(null);
  const { data } = useFetch(getList, []);
  useEffect(() => {
    new Chart(chartRef.current, {
      type: "polarArea",
      data: {
        datasets: [
          {
            data: data.map((el) => el.story.length),
            backgroundColor: colors(),
          },
        ],
        labels: data.map((el) => el.userName),
      },
      options: {
        responsive: true,
        legend: {
          position: "bottom",
        },
        scale: {
          display: false,
        },
      },
    });
  }, [data]);

  return (
    <div className="columns">
      <div className="column">
        <canvas height="240" ref={chartRef} />
      </div>
      <div className="column">
        <Table data={data} />
      </div>
    </div>
  );
}

export default Home;
