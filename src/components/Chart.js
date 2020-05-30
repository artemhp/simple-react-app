import ChartJS from "chart.js";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import colors from "../common/colors";

Chart.propTypes = {};

function Chart({ data }) {
  const chartRef = useRef(null);
  useEffect(() => {
    new ChartJS(chartRef.current, {
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
  return <canvas height="240" ref={chartRef} />;
}
export default Chart;
