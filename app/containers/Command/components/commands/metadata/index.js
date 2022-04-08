import React from 'react';
import _ from 'lodash';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Search from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import Tooltip from '@material-ui/core/Tooltip';
import ListIcon from '@material-ui/icons/List';
import { Done } from '@material-ui/icons';

export default ({
  list = [],
  deleteCommand,
  selectCommand,
  updateCommand,
  printCommand,
  dispatchQuantity,
  showSubCommands,
  forAdmin,
  canDelete,
  isAdmin,
  disableClientEditCommand,
  withOptions = true,
  blob,
  isMember,
}) => {
  return (
    <>
      {list.map(row => (
        <TableRow key={row.commandId}>
          <TableCell>{row.offerName}</TableCell>
          <TableCell>{row.laboratoryName}</TableCell>
          <TableCell>{row.pharmacyName}</TableCell>
          <TableCell>{moment(row.creationDate).format('DD/MM/YYYY')}</TableCell>
          <TableCell>{row.totalAmountDiscount.toFixed(2)}</TableCell>
          {isMember ? <TableCell>{row.deliveredAt ? row.deliveredAt.split('T')[0] : '-'}</TableCell> : null}
          {!isMember && row.isLinked ? <TableCell>{row.deliveredAt ? row.deliveredAt.split('T')[0] : '-'}</TableCell> : null}
          {withOptions && (
            <TableCell>
              <Tooltip placement="top" title="Imprimer la commande">
                <a onClick={printCommand(row)}>
                  <PrintIcon color="primary" />
                </a>
              </Tooltip>
              <Tooltip placement="top" title="Modifier la commande">
                <IconButton
                  disabled={(!isAdmin && !row.canDelete) || disableClientEditCommand}
                  onClick={updateCommand(row)}
                  style={{ padding: 5 }}
                >
                  <EditIcon color={(!isAdmin && !row.canDelete) || disableClientEditCommand ? 'disabled' : 'primary'} />
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
                    disabled={!isAdmin && !row.canDelete}
                    onClick={deleteCommand({
                      ..._.pick(row, ['commandId', 'canDelete']),
                    })}
                    style={{ padding: 5 }}
                  >
                    <HighlightOff color={!isAdmin && !row.canDelete ? 'disabled' : 'error'} />
                  </IconButton>
                </Tooltip>
              )}
              {forAdmin && (
                <>
                  <Tooltip placement="top" title="Liste des sous-commands">
                    <IconButton onClick={showSubCommands(row)} style={{ padding: 5 }}>
                      <ListIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  {/* <Tooltip placement="top" title="Dispatcher les quantités">
                  <IconButton onClick={dispatchQuantity(row)} style={{ padding: 5 }}>
                    <CheckIcon color="primary" />
                  </IconButton>
                </Tooltip> */}
                </>
              )}
              {isMember && row.isLinked ? (
                <Tooltip placement="top" title="commande livré avec succès">
                  <IconButton onClick={dispatchQuantity(row)} style={{ padding: 5 }} disabled={row.deliveredAt ? true : false}>
                    <Done color={row.deliveredAt ? '' : 'primary'} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </TableCell>
          )}
        </TableRow>
      ))}
    </>
  );
};

// onClick={printCommand(row)}
