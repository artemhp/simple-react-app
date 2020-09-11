import ChartJS from 'chart.js';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import colors from '../common/colors';

function Chart({ data }) {
  const chartRef = useRef(null);
  useEffect(() => {
    /* eslint-disable no-new */
    new ChartJS(chartRef.current, {
      type: 'polarArea',
      data: {
        datasets: [
          {
            data: data.map(el => el.rate),
            backgroundColor: colors(),
          },
        ],
        labels: data.map(el => el.name),
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
        scale: {
          display: false,
        },
      },
    });
  }, [data]);

  return <canvas height="240" ref={chartRef} />;
}

Chart.propTypes = {
  data: PropTypes.object,
};

export default Chart;
