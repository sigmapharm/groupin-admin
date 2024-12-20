import React, { Component } from 'react';
import { Stepper, Step, StepLabel, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { formatLaboratoireToLabelValue } from '../../Offres/add/utils';
import { compose } from 'redux';
import authenticated from '../../HOC/authenticated/authenticated';
import { makeSelectLaboratoires } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Button from '@material-ui/core/Button/Button';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import Papa from 'papaparse';
import Snackbar from '@material-ui/core/Snackbar';
import { Fade } from '@material-ui/core/Fade';

class UploadArticle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedLaboratoryName: '',
      selectedLaboratory: null,
      selectedLaboratoryValue: '',
      allowedExtensions: ['csv'],
      data: null,
    };
  }
  LaboratoireSelectChange = event => {
    this.setState({
      selectedLaboratory: event.label,
      selectedLaboratoryValue: event.value,
      selectedLaboratoryName: event,
    });
  };
  changeHandler(e) {
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      Papa.parse(e.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          this.setState({
            data: results.data,
          });
        },
      });
    }
  }

  _renderStepContent(laboratoire) {
    switch (this.props.pos) {
      case 0:
        return (
          <React.Fragment>
            <SingleAutoCompleteSelect
              name="laboratoire"
              options={laboratoire}
              value={this.state.selectedLaboratoryName}
              onChange={this.LaboratoireSelectChange}
              placeholder="Laboratoire"
              isClearable
            />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <input
              type="file"
              name="file"
              accept=".csv,.xlsx"
              onChange={this.changeHandler.bind(this)}
              style={{ display: 'flex', flexDirection: 'flex-col', margin: '10px auto' }}
            />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Table>
              <TableHead>
                <TableCell>Nom</TableCell>
                <TableCell>Dci</TableCell>
                <TableCell>Tva</TableCell>
                <TableCell>Ppv</TableCell>
                <TableCell>Categorie</TableCell>
                <TableCell>Class_therapeutique</TableCell>
                <TableCell>Codebare</TableCell>
                <TableCell>Forme_galenique</TableCell>
                <TableCell>Gamme</TableCell>
                <TableCell>Neccissite_prescription</TableCell>
                <TableCell>Produit_marche</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell>PPH</TableCell>
              </TableHead>
              <TableBody>
                {this.state.data.map(item => {
                  return (
                    <TableRow>
                      <TableCell> {item.nom} </TableCell>
                      <TableCell> {item.DCI} </TableCell>
                      <TableCell> {item.TVA} </TableCell>
                      <TableCell> {item.PPV} </TableCell>
                      <TableCell> {item.categorie} </TableCell>
                      <TableCell> {item.class_therapeutique} </TableCell>
                      <TableCell> {item.codebare} </TableCell>
                      <TableCell> {item.forme_galenique} </TableCell>
                      <TableCell>{item.gamme}</TableCell>
                      <TableCell> {item.neccissite_prescription === 1 ? 'Oui' : 'Non'} </TableCell>
                      <TableCell> {item.produit_marche === 1 ? 'Oui' : 'Non'} </TableCell>
                      <TableCell>{item.reference}</TableCell>
                      <TableCell> {item.PPH} </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </React.Fragment>
        );
      default:
        return <div>Not Found</div>;
    }
  }

  handleCloseDialog() {
    console.log('Close Handled');
    this.setState({
      open: false,
      pos: 0,
      selectedLaboratory: null,
      selectedLaboratoryValue: '',
      data: null,
    });
  }
  render() {
    const { laboratoires, open, handleImportArticles, uploadError, wait, handleClose } = this.props;
    const steps = ['Veuillez choisir un laboratoire', 'Importer des articles', 'Enregistrer les articles importés'];
    const formattedLaboratoire = laboratoires.map(formatLaboratoireToLabelValue);

    return (
      <div>
        <Dialog
          onClose={handleClose}
          open={open}
          PaperProps={{
            style: {
              minWidth: '75%',
              minHeight: '80vh',
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">Importer des articles </DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Stepper activeStep={this.props.pos}>
                {steps.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <React.Fragment>{this._renderStepContent(formattedLaboratoire)}</React.Fragment>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <React.Fragment>
              <Button color="primary" disabled={this.props.pos === 0} onClick={this.props.handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            </React.Fragment>
            <Button
              disabled={!this.state.selectedLaboratory || (this.props.pos == 1 && !this.state.data)}
              hidden={this.props.pos === steps.length - 1}
              color="primary"
              onClick={this.props.handleNext}
            >
              Next
            </Button>
            <Button
              disabled={!this.state.selectedLaboratory || !this.state.data || this.props.pos < 2}
              onClick={() => handleImportArticles(this.state.selectedLaboratoryValue)(this.state.data)}
            >
              Importer
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={wait} TransitionComponent={Fade} message={<span>veuillez patienter s'il vous plait</span>} />
        <Snackbar open={uploadError} TransitionComponent={Fade} message={<span>{uploadError}</span>} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  laboratoires: makeSelectLaboratoires(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  authenticated,
)(UploadArticle);
