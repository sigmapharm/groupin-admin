import React from 'react';
import _ from 'lodash';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Search from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import ListIcon from '@material-ui/icons/List';
import CheckIcon from '@material-ui/icons/Check';

export default ({
  list = [],
  deleteCommand,
  selectCommand,
  updateCommand,
  dispatchQuantity,
  showSubCommands,
  forAdmin,
  canDelete,
  withOptions = true,
}) => (
  <>
    {list.map(row => (
      <TableRow key={row.commandId}>
        <TableCell>{row.offerName}</TableCell>
        <TableCell>{row.laboratoryName}</TableCell>
        <TableCell>{row.pharmacyName}</TableCell>
        <TableCell>{moment(row.creationDate).format('YYYY-MM-DD')}</TableCell>
        <TableCell>{row.totalAmount.toFixed(2)}</TableCell>
        {withOptions && (
          <TableCell>
            <Tooltip placement="top" title="Modifier la commande">
              <IconButton onClick={updateCommand(row)} style={{ padding: 5 }}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Afficher le detail">
              <IconButton onClick={selectCommand(row)} style={{ padding: 5 }}>
                <Search color="primary" />
              </IconButton>
            </Tooltip>
            {canDelete && (
              <Tooltip placement="top" title="Annuler">
                <IconButton
                  disabled={!row.canDelete}
                  onClick={deleteCommand({
                    ..._.pick(row, ['commandId', 'canDelete']),
                  })}
                  style={{ padding: 5 }}
                >
                  <HighlightOff color="primary" />
                </IconButton>
              </Tooltip>
            )}
            {forAdmin && (
              <>
                <Tooltip placement="top" title="Liste des sous-commands">
                  <IconButton
                    onClick={showSubCommands(row)}
                    style={{ padding: 5 }}
                  >
                    <ListIcon color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip placement="top" title="Dispatcher les quantités">
                  <IconButton
                    onClick={dispatchQuantity(row)}
                    style={{ padding: 5 }}
                  >
                    <CheckIcon color="primary" />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </TableCell>
        )}
      </TableRow>
    ))}
  </>
);
