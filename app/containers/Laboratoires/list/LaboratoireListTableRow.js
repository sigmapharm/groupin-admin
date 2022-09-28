import React, { forwardRef } from 'react';
import * as PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Settings } from '@material-ui/icons';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Search from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import history from 'utils/history';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { compose } from 'redux';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import LaboratoireListConsult from '../consultlistlaboratoire/LaboratoireListConsult';
import _ from 'lodash';
import authenticated from '../../HOC/authenticated/authenticated';
import WithRoles from '../../WithRoles';
import { SUPER_ADMIN } from '../../AppHeader/Roles';
import { Button, ListItemIcon, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { DropDown } from '../../../components/DropDown';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { zeroPad } from 'react-countdown';

const RowComponent = forwardRef((props, ref) => {
  return (
    <IconButton buttonRef={ref} onClick={props.onClick}>
      <Settings />
    </IconButton>
  );
});
const typo3syle = { marginLeft: '4%' };

const addCommas = nStr => {
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export class LaboratoireListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isPopperOpen: false,
      isTippyOpen: false,
    };
  }

  viewDetails = () => {
    this.setState({
      open: true,
      isTippyOpen: false,
    });
  };

  close = () => {
    this.setState({
      open: false,
    });
  };

  edit = ({ id }) => {
    history.push(`/laboratoires/edit/${id}`);
    this.setState({ isTippyOpen: false });
  };

  // eslint-disable-next-line react/prop-types
  delete = () => {
    this.props.deleteLaboratoire(this.props.row);
    this.setState({ isTippyOpen: false });
  };

  toggleProfileMenu = e => {
    this.setState({
      anchorEl: e.currentTarget,
      isPopperOpen: true,
    });
  };

  render() {
    console.log(this.props);
    const { row } = this.props;
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell>{row.nom}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.website}</TableCell>
          <TableCell>{row.description}</TableCell>
          <TableCell>{row.adresse}</TableCell>
          <TableCell style={{ padding: 0 }}>
            <Tippy
              theme="light"
              visible={this.state.isTippyOpen}
              onClickOutside={() => this.setState({ isTippyOpen: false })}
              interactive
              content={
                <div>
                  <MenuItem onClick={this.viewDetails}>
                    <ListItemIcon style={{ padding: 5 }}>
                      <Search color="secondary" />
                    </ListItemIcon>
                    <Typography>Consulter</Typography>
                  </MenuItem>

                  {/*  */}

                  <WithRoles roles={[SUPER_ADMIN]}>
                    <MenuItem onClick={() => this.edit(row)}>
                      <ListItemIcon style={{ padding: 5 }}>
                        <EditIcon color="primary" style={typo3syle} />
                      </ListItemIcon>
                      <Typography>Modifier</Typography>
                    </MenuItem>

                    <MenuItem onClick={this.delete}>
                      <ListItemIcon style={{ padding: 5 }}>
                        <DeleteIcon color="primary" />
                      </ListItemIcon>
                      <Typography>Supprimer</Typography>
                    </MenuItem>
                  </WithRoles>
                </div>
              }
            >
              <RowComponent
                onClick={() =>
                  this.setState({
                    isTippyOpen: !this.state.isTippyOpen,
                  })
                }
              />
            </Tippy>
          </TableCell>
        </TableRow>

        {this.state.open && (
          <Dialog maxWidth="lg" onClose={this.handleClose} aria-labelledby="customized-dialog-title" open>
            <MuiDialogTitle style={{ display: 'flex', justifyContent: 'space-between' }} disableTypography>
              <Typography variant="h5" color="primary">
                {`Détails Laboratoire`}
              </Typography>
              <IconButton aria-label="Close" color="primary" onClick={this.close}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
              <LaboratoireListConsult row={row} />
            </MuiDialogContent>
          </Dialog>
        )}
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});

LaboratoireListTableRow.defaultProps = {};

LaboratoireListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
)(LaboratoireListTableRow);
