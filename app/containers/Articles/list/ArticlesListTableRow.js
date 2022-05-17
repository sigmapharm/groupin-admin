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
import { connect } from 'react-redux';
import { compose } from 'redux';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import ArticleListConsultationn from '../consultlistarticle/ArticleListConsultation';
import authenticated from '../../HOC/authenticated/authenticated';
import WithRoles from '../../WithRoles';
import { SUPER_ADMIN } from '../../AppHeader/Roles';
import { Button, ListItemIcon, MenuItem } from '@material-ui/core';
import { DropDown } from '../../../components/DropDown';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

const RowComponent = forwardRef((props, ref) => {
  return (
    <IconButton buttonRef={ref}>
      <Settings />
    </IconButton>
  );
});

const closeStyle = {
  marginLeft: '59rem',
};

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

export class ArticlesListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isPopperOpen: false,
    };
  }

  viewDetails = () => {
    this.setState({
      open: true,
    });
  };

  close = () => {
    this.setState({
      open: false,
    });
  };

  edit = ({ id }) => history.push(`/articles/edit/${id}`);

  // eslint-disable-next-line react/prop-types
  delete = () => this.props.deleteArticle();

  toggleProfileMenu = e => {
    this.setState({
      anchorEl: e.currentTarget,
      isPopperOpen: true,
    });
  };

  render() {
    const { row } = this.props;
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell>{row.laboratoire && row.laboratoire.nom}</TableCell>
          <TableCell>{row.categorie}</TableCell>
          <TableCell>{row.nom}</TableCell>
          <TableCell>{(_.get(row, 'pph') || 0).toFixed(2)}</TableCell>
          <TableCell>{(_.get(row, 'ppv', 0) || 0).toFixed(2)}</TableCell>
          <TableCell>
            {row.tva}
            {'%'}
          </TableCell>
          <TableCell style={{ padding: 0 }}>
            <Tippy
              theme="light"
              trigger="click"
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
              <RowComponent />
            </Tippy>
          </TableCell>
        </TableRow>

        {this.state.open && (
          <Dialog maxWidth="lg" onClose={this.handleClose} aria-labelledby="customized-dialog-title" open>
            <MuiDialogTitle style={{ display: 'flex', justifyContent: 'space-between' }} disableTypography>
              <Typography variant="h5" color="primary">
                {`Détails article`}
              </Typography>
              <IconButton aria-label="Close" color="primary" onClick={this.close}>
                <CloseIcon />
              </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent>
              <ArticleListConsultationn row={row} />
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

ArticlesListTableRow.defaultProps = {};

ArticlesListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
)(ArticlesListTableRow);
