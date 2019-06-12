import React from 'react';
import * as PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Search from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ArticleListConsultationn from '../consultlistarticle/ArticleListConsultationn';
import { deleteArticle } from '../actions';
import authenticated from '../../HOC/authenticated/authenticated';

const closeStyle = {
  marginLeft: '59rem',
};

const typo3syle = { marginLeft: '4%' };

const addCommas = nStr => {
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  // eslint-disable-next-line prefer-template
  const x2 = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export class AticlesListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isdisplaydata: false };
  }

  edit = row => {
    this.setState({
      isdisplaydata: true,
    });
  };

  handledetailclose = () => {
    this.setState({
      isdisplaydata: false,
    });
  };

  delete = row => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    // eslint-disable-next-line react/prop-types
    const rows = this.props.dispach(deleteArticle(row));
    // eslint-disable-next-line react/no-unused-state
    this.setState({ rows });
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { row, deletearticle } = this.props;
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.laboratoire && row.laboratoire.nom}
          </TableCell>
          <TableCell>{row.categorie}</TableCell>
          <TableCell>{row.nom}</TableCell>
          <TableCell>
            {addCommas(row.pph)
              .replace(/,/g, ' ')
              .replace('.', ',')}
          </TableCell>
          <TableCell>
            {addCommas(row.ppv)
              .replace(/,/g, ' ')
              .replace('.', ',')}
          </TableCell>
          <TableCell>
            {row.tva}
            {'%'}
          </TableCell>
          <TableCell>
            <Search color="secondary" onClick={() => this.edit(row)} />
            <EditIcon color="primary" style={typo3syle} />
            <Delete
              color="error"
              style={typo3syle}
              onClick={() => this.delete(row.id)}
            />
          </TableCell>
        </TableRow>

        <Dialog
          maxWidth="lg"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.isdisplaydata}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h5" color="primary">
              {`Détails article`}
              <IconButton
                aria-label="Close"
                color="primary"
                style={closeStyle}
                onClick={this.handledetailclose}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent>
            <ArticleListConsultationn row={row} />
          </MuiDialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch,
});

AticlesListTableRow.defaultProps = {};

AticlesListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  deletearticle: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};
const withConnect = connect(
  // eslint-disable-next-line no-undef
  null,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
)(AticlesListTableRow);
