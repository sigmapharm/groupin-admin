import React, { useMemo } from 'react';
import * as _ from 'lodash';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';
import groupBy from 'group-by';

function colors(total) {
  if (!_.isNumber(Number(total))) {
    return null;
  } else if (_.inRange(Number(total), 15000, 20000)) {
    return 'orange';
  } else if (_.gte(Number(total), 20000)) {
    return 'green';
  } else if (_.lte(Number(total), 15000)) {
    return 'red';
  } else {
    return null;
  }
}
function isOdd(number) {
  return number % 2 > 0;
}

export const DataTableBody = ({ rows }) => {
  const _data = useMemo(
    () => {
      const groupedData = groupBy(rows || [], 'denomination');

      return Object.entries(groupedData).map(([key, value], index) => {
        return {
          label: key,
          data: value.map((val, _index) => ({
            total: val.ca ? val.ca.toFixed(2) : null,
            quantity: val.nbr_co,
            mois: val.mois,
          })),
        };
      });
    },
    [rows],
  );

  return (
    <TableBody>
      {_data.map((element, index) => {
        const item = element.data;
        return (
          <TableRow key={index} style={{ backgroundColor: isOdd(index) ? '#e2e8f0' : undefined }}>
            <TableCell style={{ padding: 3, borderLeft: '1px solid black', textAlign: 'center' }}>{element.label}</TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 1)[0] && item.filter(d => d.mois === 1)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} /> :{' '}
                {item.filter(d => d.mois === 1)[0] ? item.filter(d => d.mois === 1)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 2)[0] && item.filter(d => d.mois === 2)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 2)[0] ? item.filter(d => d.mois === 2)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 3)[0] && item.filter(d => d.mois === 3)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 3)[0] ? item.filter(d => d.mois === 3)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 4)[0] && item.filter(d => d.mois === 4)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 4)[0] ? item.filter(d => d.mois === 4)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 5)[0] && item.filter(d => d.mois === 5)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 5)[0] ? item.filter(d => d.mois === 5)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 6)[0] && item.filter(d => d.mois === 6)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 6)[0] ? item.filter(d => d.mois === 6)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 7)[0] && item.filter(d => d.mois === 7)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 7)[0] ? item.filter(d => d.mois === 7)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 8)[0] && item.filter(d => d.mois === 8)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 8)[0] ? item.filter(d => d.mois === 8)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 9)[0] && item.filter(d => d.mois === 9)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 9)[0] ? item.filter(d => d.mois === 9)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 10)[0] && item.filter(d => d.mois === 10)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 10)[0] ? item.filter(d => d.mois === 10)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 11)[0] && item.filter(d => d.mois === 11)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 11)[0] ? item.filter(d => d.mois === 11)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
                color: colors(item.filter(d => d.mois === 12)[0] && item.filter(d => d.mois === 12)[0].total),
              }}
            >
              <div style={{ display: 'flex' }}>
                <AttachMoney style={{ fontSize: 15 }} fontSize="small" /> :{' '}
                {item.filter(d => d.mois === 12)[0] ? item.filter(d => d.mois === 12)[0].total : '------'}
              </div>
            </TableCell>
            <TableCell
              style={{
                padding: 0,
                borderLeft: '1px solid black',
              }}
            >
              <div style={{ display: 'flex' }}>{_.sum(_.map(item, i => Number(i.total))).toFixed(2)}</div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
