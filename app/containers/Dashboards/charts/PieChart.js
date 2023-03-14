import React from 'react';
import { Pie } from 'react-chartjs-2';
import { backgroundColor, borderColor } from './chartGlobalStyle';
import * as _ from 'lodash';
import { useMemo } from 'react';
const PieChart = ({ data, labels, label }) => {
  const activite = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const totalAmount = useMemo(
    () => {
      return _.sum(data, item => item.value);
    },
    [data],
  );

  return (
    <Pie
      data={activite}
      options={{
        plugins: {
          legend: { position: 'left' },
          labels: { usePointStyle: true },
          title: {
            display: true,
            align: 'top',
            text: label,
            padding: {
              bottom: 10,
            },
          },
          tooltip: {
            callbacks: {
              title: (t, d) => {
                console.log(t);
                return t[0].label + ' ' + ((t[0].parsed / totalAmount) * 100).toFixed(2) + ' %';
              },
            },
          },
        },
      }}
      style={{ maxHeight: '240px' }}
    />
  );
};

export default React.memo(PieChart);
