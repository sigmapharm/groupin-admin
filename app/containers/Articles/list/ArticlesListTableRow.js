import React from 'react';
import * as PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
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
import ArticleListConsultationn from '../consultlistarticle/ArticleListConsultation';
import authenticated from '../../HOC/authenticated/authenticated';
import WithRoles from '../../WithRoles';
import { SUPER_ADMIN } from '../../AppHeader/Roles';

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
    this.state = { open: false };
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

  render() {
    const { row } = this.props;
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell>{row.laboratoire && row.laboratoire.nom}</TableCell>
          <TableCell>{row.categorie}</TableCell>
          <TableCell>{row.nom}</TableCell>
          <TableCell>
            {(_.get(row,'pph') || 0).toFixed(2) }
          </TableCell>
          <TableCell>
            {(_.get(row,'ppv',0) || 0).toFixed(2)}
          </TableCell>
          <TableCell>
            {row.tva}
            {'%'}
          </TableCell>
          <TableCell style={{ padding: 0 }}>
            <Tooltip placement="top" title="Consulter">
              <IconButton style={{ padding: 5 }}>
                <Search color="secondary" onClick={this.viewDetails} />
              </IconButton>
            </Tooltip>
            <WithRoles roles={[SUPER_ADMIN]}>
              <Tooltip placement="top" title="Modifier">
                <IconButton
                  onClick={() => this.edit(row)}
                  style={{ padding: 5 }}
                >
                  <EditIcon color="primary" style={typo3syle} />
                </IconButton>
              </Tooltip>
            </WithRoles>
          </TableCell>
        </TableRow>
        {this.state.open && (
          <Dialog
            maxWidth="lg"
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open
          >
            <MuiDialogTitle style={{display:'flex',justifyContent:'space-between'}} disableTypography>
              <Typography variant="h5" color="primary">
                {`Détails article`}
              </Typography>
              <IconButton
                aria-label="Close"
                color="primary"
                onClick={this.close}
              >
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
