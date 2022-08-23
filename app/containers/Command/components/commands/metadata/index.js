import React, { forwardRef, useState } from 'react';
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
import { Done, Receipt, Settings } from '@material-ui/icons';
import { DropDown } from '../../../../../components/DropDown';
import { ListItemIcon, MenuItem, Typography } from '@material-ui/core';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const RowComponent = forwardRef((props, ref) => {
  return (
    // <WithRoles roles={[ADMIN, SUPER_ADMIN]}>
    <TableCell>
      <IconButton buttonRef={ref} onClick={props.onClick}>
        <Settings />
      </IconButton>
    </TableCell>
    // </WithRoles>
  );
});

export default ({
  list = [],
  deleteCommand,
  selectCommand,
  updateCommand,
  printCommand,
  dispatchQuantity,
  dispatchQuantityCancel,
  showSubCommands,

  forAdmin,
  canDelete,
  isAdmin,
  disableClientEditCommand,
  withOptions = true,
  blob,
  isMember,
  canGroup,
  printFacture,
  printBL,
  isTippyOpen,
  handleTippyToggle,
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
          {/* {isMember ? <TableCell>{row.deliveredAt ? row.deliveredAt.split('T')[0] : '-'}</TableCell> : null} */}
          {/* {row.isLinked ? <TableCell>{row.deliveredAt ? row.deliveredAt.split('T')[0] : '-'}</TableCell> : null} */}
          {!row.isAggregate ? <TableCell>{row.deliveredAt ? row.deliveredAt.split('T')[0] : '-'}</TableCell> : null}
          {/* start */}
          {withOptions && (
            <Tippy
              theme="light"
              // visible={isTippyOpen}
              // onClickOutside={handleTippyToggle}
              trigger="click"
              interactive
              content={
                <div>
                  {printCommand && (
                    <MenuItem onClick={printCommand && printCommand(row)}>
                      <ListItemIcon>
                        <PrintIcon color="primary" />
                      </ListItemIcon>
                      <Typography>Imprimer BC </Typography>
                    </MenuItem>
                  )}
                  {!row.isAggregate && (
                    <MenuItem onClick={printFacture && printFacture(row)} disabled={row.deliveredAt ? false : true}>
                      <ListItemIcon>
                        {/* <Receipt color={row.deliveredAt ? 'primary' : ''} /> */}
                        <PrintIcon color={row.deliveredAt ? 'primary' : ''} />
                      </ListItemIcon>
                      <Typography>Imprimer facture </Typography>
                    </MenuItem>
                  )}
                  {!row.isAggregate && (
                    <MenuItem onClick={printBL && printBL(row)} disabled={row.deliveredAt ? false : true}>
                      <ListItemIcon>
                        {/* <Receipt color={row.deliveredAt ? 'primary' : ''} /> */}
                        <PrintIcon color={row.deliveredAt ? 'primary' : ''} />
                      </ListItemIcon>
                      <Typography>Imprimer BL </Typography>
                    </MenuItem>
                  )}
                  {updateCommand && (
                    <MenuItem disabled={(!isAdmin && !row.canDelete) || disableClientEditCommand} onClick={updateCommand(row)}>
                      <ListItemIcon>
                        <EditIcon color={(!isAdmin && !row.canDelete) || disableClientEditCommand ? 'disabled' : 'primary'} />
                      </ListItemIcon>
                      <Typography>Modifier</Typography>
                    </MenuItem>
                  )}
                  {selectCommand && (
                    <MenuItem onClick={selectCommand(row)}>
                      <ListItemIcon>
                        <Search color="primary" />
                      </ListItemIcon>
                      <Typography>Consulter</Typography>
                    </MenuItem>
                  )}
                  {/* {canDelete && ( */}
                  <MenuItem
                    disabled={!isAdmin && !row.canDelete}
                    onClick={deleteCommand({
                      ..._.pick(row, ['commandId', 'canDelete']),
                    })}
                  >
                    <ListItemIcon>
                      <HighlightOff color={!isAdmin && !row.canDelete ? 'disabled' : 'error'} />
                    </ListItemIcon>
                    <Typography>Annuler</Typography>
                  </MenuItem>

                  <MenuItem
                    disabled={!isAdmin && !row.canDelete}
                    onClick={dispatchQuantityCancel({
                      ..._.pick(row, ['commandId', 'canDelete']),
                    })}
                  >
                    <ListItemIcon>
                      <HighlightOff color={!isAdmin && !row.canDelete ? 'disabled' : 'error'} />
                    </ListItemIcon>
                    <Typography>Annuler livraison</Typography>
                  </MenuItem>

                  {/* )} */}
                  {forAdmin && (
                    <MenuItem onClick={showSubCommands(row)}>
                      <ListItemIcon>
                        <ListIcon color="primary" />
                      </ListItemIcon>
                      <Typography>Sous-Commandes</Typography>
                    </MenuItem>
                  )}
                  {/* <Tooltip placement="top" title="Dispatcher les quantités">
                  <IconButton onClick={dispatchQuantity(row)} style={{ padding: 5 }}>
                    <CheckIcon color="primary" />
                  </IconButton>
                </Tooltip> */}
                  {isMember ? (
                    <MenuItem onClick={dispatchQuantity(row)} disabled={row.deliveredAt ? true : false}>
                      <ListItemIcon>
                        <Done color={row.deliveredAt ? '' : 'primary'} />
                      </ListItemIcon>
                      <Typography>commande livré</Typography>
                    </MenuItem>
                  ) : null}
                </div>
              }
            >
              <RowComponent onClick={handleTippyToggle} />
            </Tippy>
          )}

          {/* end */}
        </TableRow>
      ))}
    </>
  );
};

// onClick={printCommand(row)}
