import React, { useMemo } from 'react';
import * as _ from 'lodash';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { AttachMoney, ShoppingCart } from '@material-ui/icons';

function colors(total) {
  if (!_.isNumber(total)) {
    return null;
  } else if (_.inRange(total, 15000, 20000)) {
    return 'orange';
  } else if (_.gte(total, 20000)) {
    return 'green';
  } else if (_.lte(total, 15000)) {
    return 'red';
  } else {
    return null;
  }
}

export const LaboDataTableBody = ({ rows }) => {
  const data = useMemo(
    () => {
      return _.groupBy(rows, 'nom');
    },
    [rows],
  );
  console.log(data);
  return (
    <TableBody>
      {Object.keys(data).map(key => {
        return (
          <TableRow key={key}>
            <TableCell style={{ padding: 3, borderLeft: '1px solid black', textAlign: 'center' }}>{key}</TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][0] && data[key][0].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} /> :{' '}
                {data[key][0] && data[key][0].ca ? data[key][0].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][0] && data[key][0].nbr_co ? data[key][0].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][1] && data[key][1].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][1] && data[key][1].ca ? data[key][1].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][1] && data[key][1].nbr_co ? data[key][1].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][2] && data[key][2].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][2] && data[key][2].ca ? data[key][2].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][2] && data[key][2].nbr_co ? data[key][2].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][3] && data[key][3].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][3] && data[key][3].ca ? data[key][3].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][3] && data[key][3].nbr_co ? data[key][3].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][4] && data[key][4].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][4] && data[key][4].ca ? data[key][4].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][4] && data[key][4].nbr_co ? data[key][4].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][5] && data[key][5].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][5] && data[key][5].ca ? data[key][5].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][5] && data[key][5].nbr_co ? data[key][5].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][6] && data[key][6].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][6] && data[key][6].ca ? data[key][6].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][6] && data[key][6].nbr_co ? data[key][6].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][7] && data[key][7].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][7] && data[key][7].ca ? data[key][7].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][7] && data[key][7].nbr_co ? data[key][7].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][8] && data[key][8].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][8] && data[key][8].ca ? data[key][8].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][8] && data[key][8].nbr_co ? data[key][8].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][9] && data[key][9].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][9] && data[key][9].ca ? data[key][9].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> : {data[key][9] && data[key][9].nbr_co ? data[key][9].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][10] && data[key][10].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][10] && data[key][10].ca ? data[key][10].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> :{' '}
                {data[key][10] && data[key][10].nbr_co ? data[key][10].nbr_co : '------'}
              </div>
            </TableCell>
            <TableCell style={{ padding: 0, borderLeft: '1px solid black', color: colors(data[key][11] && data[key][11].ca) }}>
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {data[key][11] && data[key][11].ca ? data[key][11].ca.toFixed(2) : '------'}
              </div>
              <div>
                <ShoppingCart style={{ fontSize: 15 }} /> :{' '}
                {data[key][11] && data[key][11].nbr_co ? data[key][11].nbr_co : '------'}
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
