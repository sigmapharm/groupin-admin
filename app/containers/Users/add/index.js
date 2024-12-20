import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
import authenticated from '../../HOC/authenticated/authenticated';
import { validateFormData } from './validation';
import { createUser } from '../actions';
import { makeSelectLaboratoires, makeSelectPharmacies, selectCities } from '../../App/selectors';

import { selectRegions } from '../../App/selectors';

import { formaRegionToLabelValue, formatCityToLabelValue, formatPharmacieToLabelValue } from './utils';
import AddUserForm from '../../../components/Users/add/AddUserForm';
import AddPharmacieContainer from '../../Pharmacie/add';
import _ from 'lodash';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 5,
  },
  title: {
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
  },
  gridContainer: {
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 5,
  },
  divider: {
    marginTop: theme.spacing.unit * 5,
  },
  select: {
    marginTop: theme.spacing.unit,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  gridContainer2: {
    paddingLeft: theme.spacing.unit * 9,
    paddingRight: theme.spacing.unit * 15,
  },
});

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    cin: '',
    email: '',
    tel: '',
    gsm: '',
    ville: '',
    codePostal: '',
    laboId: '',
    subscriptionType: 'FREE',
    pharmacie: {
      denomination: '',
      adresse: '',
      tel: '',
      gsm: '',
      patente: '',
      numRC: '',
      interlocuteur: '',
      fonction: '',
      formeJuridique: '',
      banque: '',
      dateDemarrage: '',
      dateCreation: '',
      ice: '',
    },
    role: '',
  },
  isLaboAddMode: false,
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
  isAddPharmacie: false,
};

export class AddUser extends React.PureComponent {
  state = { ...initialState };

  handleFormDataChange = e => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handlePharmacieSelectChange = value => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        pharmacie: value,
      },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formData } = this.state;
    const validation = validateFormData(formData);
    if (validation && validation.messages && validation.fields) {
      this.setState({
        errors: {
          ...validation,
        },
        isSuccess: false,
      });
    } else {
      this.setState({
        errors: {
          fields: {},
          messages: {},
        },
      });
      const formattedData = {
        ...formData,
        isLaboAddMode: this.state.isLaboAddMode,
        ville: {
          id: formData.ville && formData.ville.value,
        },
        formeJuridique: formData.formeJuridique ? formData.formeJuridique.label : '',
        role: _.get(formData, 'role.value', ''),
      };

      this.props.dispatch(createUser(formattedData, this.handleSubmitResponse));
    }
  };

  handleSubmitResponse = response => {
    if (!response) {
      return;
    }
    if (response.id) {
      this.setState({
        ...initialState,
        isSuccess: true,
      });
    } else if (response.errors) {
      const { errors } = this.state;
      this.setState({
        errors: {
          ...errors,
          messages: { ...response.errors },
        },
        isSuccess: false,
      });
    }
  };

  handleCloseSuccessMessage = () => {
    this.setState({ isSuccess: false });
  };

  handleGoToUsersList = () => {
    history.push('/users');
  };

  handleAddPharmacieClose = () => {
    this.setState({
      isAddPharmacie: false,
    });
  };

  handleAddPharmacieOpen = () => {
    this.setState({
      isAddPharmacie: true,
    });
  };

  handleAddPharmacieSuccess = newPharmacie => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        pharmacie: formatPharmacieToLabelValue(newPharmacie),
      },
      isAddPharmacie: false,
    });
  };

  handleInputChange = e => {
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        pharmacie: {
          ...formData.pharmacie,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  handleSelectChange = name => value => {
    const { formData } = this.state;

    this.setState({
      formData: {
        ...formData,
        pharmacie: {
          ...formData.pharmacie,
          ville: name === 'region' ? null : formData.ville,
          [name]: value,
        },
      },
    });
  };

  handleLaboModeChage = role => {
    if (role === 'LABO_MEMBRE') {
      this.setState({ isLaboAddMode: true });
      return;
    }
    this.setState({ isLaboAddMode: false });
  };

  render() {
    const { classes, pharmacies, cities, regions } = this.props;
    const { formData, errors, isSuccess } = this.state;
    const formattedPharmacies = pharmacies.map(formatPharmacieToLabelValue);
    const formattedCities = cities.map(formatCityToLabelValue);
    const formatedRegions = regions.map(formaRegionToLabelValue);
    const formatedLabos = this.props.laboratoires.map(item => ({ label: item.nom, value: item.id }));

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <AddUserForm
            errors={errors}
            pharmacies={formattedPharmacies}
            cities={formattedCities}
            regions={formatedRegions}
            formData={formData}
            handleFormDataChange={this.handleFormDataChange}
            handlePharmacieSelectChange={this.handlePharmacieSelectChange}
            handleSubmit={this.handleSubmit}
            handleAddPharmacieClick={this.handleAddPharmacieOpen}
            handleAnuler={this.handleGoToUsersList}
            disbaleButton={!this.state.isLaboAddMode}
            handleLaboModeChage={this.handleLaboModeChage}
            labos={formatedLabos}
            isLaboAddMode={this.state.isLaboAddMode}
          />
          {!this.state.isLaboAddMode && (
            <Paper className={classes.gridContainer2}>
              <AddPharmacieContainer
                successCallback={this.handleAddPharmacieSuccess}
                handleFormDataChange={this.handleFormDataChange}
                handleState={this.setState}
                formData={formData}
                handleInputChange={this.handleInputChange}
                handleSelectChange={this.handleSelectChange}
                handleSubmit={this.handleSubmit}
              />
            </Paper>
          )}
        </form>
        <Dialog
          maxWidth="lg"
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.isAddPharmacie}
        >
          <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h5" color="primary">
              {`Ajouter une nouvelle pharmacie`}
            </Typography>
            <IconButton aria-label="Close" className={classes.closeButton} onClick={this.handleAddPharmacieClose}>
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <MuiDialogContent>
            <AddPharmacieContainer successCallback={this.handleAddPharmacieSuccess} />
          </MuiDialogContent>
        </Dialog>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={<span id="message-id">utilisateur a été créé avec succès.</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={this.handleGoToUsersList}>
                Liste des utilisateurs
              </Button>,
              <IconButton key="close" color="inherit" onClick={this.handleCloseSuccessMessage}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  pharmacies: makeSelectPharmacies(),
  cities: selectCities(),
  regions: selectRegions(),
  laboratoires: makeSelectLaboratoires(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

AddUser.defaultProps = {};

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  pharmacies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      denomination: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default compose(
  withStyles(styles),
  withConnect,
  authenticated,
)(AddUser);
