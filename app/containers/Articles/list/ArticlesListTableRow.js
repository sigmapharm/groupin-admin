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
import ArticleListConsultationn from '../consultlistarticle/ArticleListConsultationn';



const closeStyle = {
  marginLeft:"59rem",
};

const typo3syle = { marginLeft: '4%' };

const addCommas = (nStr) => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
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

  edit = (row) => {
    this.setState({
      isdisplaydata: true,
    });
  };
  handledetailclose = () => {
    this.setState({
      isdisplaydata: false,
    });
  };

  render() {
    const { row } = this.props;
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.laboratoire && row.laboratoire.nom}
          </TableCell>
          <TableCell>{row.categorie}</TableCell>
          <TableCell>{row.nom}</TableCell>
          <TableCell>{addCommas(row.pph.toFixed(2)).replace(/,/g, ' ').replace('.', ',')}</TableCell>
          <TableCell>{addCommas(row.ppv.toFixed(2)).replace(/,/g, ' ').replace('.', ',')}</TableCell>
          <TableCell>{row.tva}{'%'}</TableCell>
          <TableCell>
            <Search color="secondary" onClick={() => this.edit(row)}/>
            <EditIcon color="primary" style={typo3syle}/>
            <Delete color="error" style={typo3syle}/>
          </TableCell>
        </TableRow>

        <Dialog
          maxWidth="lg"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title" open={this.state.isdisplaydata}>
          <MuiDialogTitle disableTypography>

            <Typography variant="h5" color="primary">
              {`Détails article`}
              <IconButton
                aria-label="Close" color={'primary'} style={closeStyle}
                onClick={this.handledetailclose}><CloseIcon/>
              </IconButton>
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent>
            <ArticleListConsultationn row={row}/>
          </MuiDialogContent>
        </Dialog>
      </React.Fragment>);
  }
}

AticlesListTableRow.defaultProps = {};

AticlesListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};
export default AticlesListTableRow;
