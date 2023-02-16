import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { withStyles, Paper } from '@material-ui/core';
import ChartTable from '../Table/index';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import _ from 'lodash';
import { formatNumber } from '../../../utils/formatNumber';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "chiffre d' affaires par articles (MAD)",
    },
  },
};

const cols = [
  {
    label: 'Désignation',
    colName: 'designation',
    orderName: 'nom',
  },
  // {
  //   label: 'Articles commandés',
  //   colName: 'articlesCommandes',
  //   orderName: 'total',
  // },
  {
    label: "chiffre d'affaires",
    colName: 'ca',
    orderName: '',
  },
];

function LineChart(props) {
  const {
    classes,
    rows: { content = [], pageable, sort, totalPages, first, last, numberOfElements, totalElements, empty },
    tableUpdate,
    dispatch,
    fromDate,
    toDate,
  } = props;

  const _labels = _.map(content, row => {
    return row.designation.slice(0, 20);
  });

  const _dataSet = _.map(content, row => {
    return row.ca;
  });

  const data = {
    labels: _labels,
    datasets: [
      {
        label: "Chiffre d'affaires (MAD) ",
        data: _dataSet,
        borderColor: '#034CD5',
        backgroundColor: '#034CD5',
      },
    ],
  };

  return (
    <Paper className={classes.chartContainer}>
      <div className={classes.chart}>
        <Line options={options} data={data} height="100%" />
      </div>
      <ChartTable
        cols={cols}
        rows={content}
        pageable={pageable}
        sort={sort}
        totalPages={totalPages}
        first={first}
        last={last}
        numberOfElements={numberOfElements}
        totalElements={totalElements}
        empty={empty}
        tableUpdate={tableUpdate}
        dispatch={dispatch}
        fromDate={fromDate}
        toDate={toDate}
      >
        {content.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{row.designation}</TableCell>
              {/* <TableCell>{row.articlesCommandes}</TableCell> */}
              <TableCell>{formatNumber.format(row.ca)}</TableCell>
            </TableRow>
          );
        })}
      </ChartTable>
    </Paper>
  );
}

const styles = theme => ({
  chartContainer: {
    minHeight: 300,
    padding: 15,
    borderRadius: 10,
  },

  chart: {
    height: 300,
  },
});

export default withStyles(styles)(LineChart);
