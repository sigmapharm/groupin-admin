import React from 'react';
import { withStyles, Paper } from '@material-ui/core';
import ChartTable from '../Table/index';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import _ from 'lodash';
import { formatNumber } from '../../../utils/formatNumber';
ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
    },
    title: {
      display: true,
      text: "chiffre d' affaires par Laboratoire (MAD)",
    },
  },
};

const cols = [
  {
    label: 'Laboratoire',
    colName: 'designation',
    order: 'asc',
    orderName: 'nom',
  },
  {
    label: 'Articles Commandés',
    colName: 'articlesCommandes',
    order: 'asc',
    orderName: 'total',
  },
  {
    label: "chiffre d'affaires",
    colName: 'ca',
    order: 'asc',
    orderName: '',
  },
  {
    label: 'delai Livraison',
    colName: 'delaiLivraison',
    order: 'asc',
    orderName: 'delai',
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
    return row.designation;
  });

  const _dataSet = _.map(content, row => {
    return row.ca;
  });

  const data = {
    labels: _labels,
    datasets: [
      {
        label: '# of Votes',
        data: _dataSet,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Paper className={classes.chartContainer}>
      <div className={classes.chart}>
        <Doughnut options={options} data={data} height="100%" />
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
              <TableCell>{row.articlesCommandes}</TableCell>
              <TableCell>{formatNumber.format(row.ca)}</TableCell>
              <TableCell>{row.delaiLivraison ? row.delaiLivraison + ' j' : '-'}</TableCell>
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
    marginTop: 20,
  },

  chart: {
    height: 300,
  },
});

export default withStyles(styles)(LineChart);
