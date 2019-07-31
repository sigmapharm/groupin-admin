import React from 'react';
import _ from 'lodash';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '../../../../components/Table';

const commandHeaders = [
  { title: 'Offre' },
  { title: 'Laboratoire' },
  { title: 'Date commande' },
  { title: 'Total' },
];
const styles = theme => ({
  disabled: {
    pointerEvents: 'none',
    background: '#0000000f',
  },
});

export default withStyles(styles)(
  ({ checkAllValue, onToggleCheckAll, classes, commands = [], onChange }) => (
    <>
      <Typography style={{ textAlign: 'center' }}>
        Total :{' '}
        {(
          _.sumBy(
            commands,
            ({ selected, totalAmount }) => (selected ? totalAmount : 0),
          ) || 0
        ).toFixed(2)}
      </Typography>
      <Table
        headers={_.concat(
          [<Checkbox checked={checkAllValue} onChange={onToggleCheckAll} />],
          commandHeaders,
        )}
        emptyMsg="Aucune Commande soumise"
        pageable={false}
      >
        {commands.map((row, index) => (
          <TableRow
            {...{ className: row.isLinked ? classes.disabled : '' }}
            key={row.commandId}
          >
            <TableCell>
              <Checkbox
                checked={!!row.selected}
                onChange={({ target: { checked: selected } }) =>
                  !row.isLinked && onChange({ index, selected })
                }
              />
            </TableCell>
            <TableCell>{row.offerName}</TableCell>
            <TableCell>{row.laboratoryName}</TableCell>
            <TableCell>
              {moment(row.creationDate).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell>{row.totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  ),
);
