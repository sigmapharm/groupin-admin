import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { backgroundColor, borderColor } from './chartGlobalStyle';

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

  return (
    <Bar
      data={activite}
      options={{
        plugins: {
          //   legend: { position: 'left' },
          labels: { usePointStyle: true },
          title: {
            display: true,
            align: 'top',
            text: label,
            padding: {
              bottom: 10,
            },
          },
        },
      }}
      style={{ maxHeight: '240px' }}
    />
  );
};

export default React.memo(PieChart);
