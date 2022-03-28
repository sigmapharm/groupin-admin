import React from 'react';
import { withStyles, Paper } from '@material-ui/core';
import ChartTable from '../Table/index';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "chiffre d' affaires par Region (MAD)",
    },
  },
};

const labels = ['1', '2', '3', '4', '5', '6', '7'];

const cols = [
  {
    label: '#id',
    colName: 'id',
  },
  {
    label: 'Region',
    colName: 'region',
  },
  {
    label: 'Articles commandés',
    colName: 'article_commandes',
  },
  {
    label: "chiffre d'affaires",
    colName: 'chiffre_affaires',
  },
];

export const data = {
  labels,
  datasets: [
    {
      label: "Chiffre d'affaires",
      data: [9828, 1665, 2862, 9272, 272, 9732, 254],
      borderColor: '#034CD5',
      backgroundColor: '#034CD5',
    },
  ],
};

function LineChart({ classes, rows }) {
  return (
    <Paper className={classes.chartContainer}>
      <div className={classes.chart}>
        <Bar options={options} data={data} height="100%" />
      </div>
      <ChartTable cols={cols} rows={rows}>
        {({ page, rowsPerPage }) => {
          return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.region}</TableCell>
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
    marginTop: 30,
  },

  chart: {
    height: 300,
  },
});

export default withStyles(styles)(LineChart);
