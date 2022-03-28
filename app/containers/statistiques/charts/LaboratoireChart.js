import React from 'react';
import { withStyles, Paper } from '@material-ui/core';
import ChartTable from '../Table/index';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left',
    },
    title: {
      display: true,
      text: "chiffre d' affaires par Laboratoire (%)",
    },
  },
};

const cols = [
  {
    label: 'Laboratoire',
    colName: 'laboratoire',
  },
  {
    label: 'Articles Commandés',
    colName: 'article_commandes',
  },
  {
    label: "chiffre d'affaires",
    colName: 'chiffre_affaires',
  },
];

export const data = {
  labels: [
    'Ph. RA/SALE',
    'Ph. TRE / FES',
    'Ph. AIS / CASABLANCA',
    'Ph. / CASA',
    'Ph. NOUR / TAMSENA',
    'Ph. A / FES',
    'Ph. KHLALFA /TAOUNAT',
    'Ph. ceaux Sale sarlau',
  ],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3, 7, 9],
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

function LineChart({ classes, rows = [] }) {
  return (
    <Paper className={classes.chartContainer}>
      <div className={classes.chart}>
        <Doughnut options={options} data={data} height="100%" />
      </div>
      <ChartTable cols={cols} rows={rows}>
        {({ page, rowsPerPage }) => {
          return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{row.laboratoire}</TableCell>
                <TableCell>{row.article_commandes}</TableCell>
                <TableCell>{row.chiffre_affaires}</TableCell>
              </TableRow>
            );
          });
        }}
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
