import React from 'react';
import * as PropTypes from 'prop-types';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

import { createStructuredSelector } from 'reselect';
import { defaultOptionsFormatter, pharmacieFields, validateFormData } from './fields';

import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import { addPharmacie } from './actions';
import ErrorsArea from '../../../components/ErrorsArea';
import { selectRegions } from '../../App/selectors';
import { Typography } from '@material-ui/core';

/* istanbul ignore next */
const styles = theme => ({
  fieldContainer: {
    maxWidth: '500px',
    minWidth: '500px',
    paddingLeft: '50px',
    paddingRight: '50px',
    '& > *': {
      height: '48px',
    },
  },
  submitButton: {
    marginTop: theme.spacing.unit * 3,
  },
  inputs: {
    maxWidth: '350px',
    paddingLeft: '50px',
    // paddingRight: '50px',
    marginTop: 10,
    '& > *': {
      height: '48px',
    },
  },
});

const initialState = {
  formData: {
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
  errors: {
    messages: {},
    fields: {},
  },
  success: false,
};

export class AddPharmacieContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  getRenderedProps = field => {
    const { formData } = this.props;
    const { regions } = this.props;

    const options = {
      region: regions,
      ville: _.get(_.find(regions, { id: _.get(formData.pharmacie, 'region.value') }), 'cities', []),
    };
    let props = {
      name: field.name,
      label: field.label,
      value: (field.valueFormatter && field.valueFormatter(formData.pharmacie[field.name])) || formData.pharmacie[field.name],
      fullWidth: true,
      onChange: this.props.handleInputChange,

      error: this.state.errors && this.state.errors.fields && this.state.errors.fields[field.name],
    };
    if (field.specialProps) {
      props = {
        ...props,
        ...field.specialProps,
      };
    }
    if (field.select) {
      props = {
        ...props,
        options: (options[field.name] || (field.options || this.props[field.fromProps])).map(field.optionFormatter),
        onChange: this.props.handleSelectChange(field.name),

        placeholder: field.placeholder,
      };
    }
    if (field.type) {
      props = {
        ...props,
        type: field.type,
      };
    }

    return props;
  };

  renderField = (field, classes) => {
    if (!field) {
      return null;
    }

    const Component = field.select ? SingleAutoCompleteSelect : TextField;
    const fieldProps = this.getRenderedProps(field);
    return (
      <Grid key={field.id} className={classes.inputs} xs={8} md={4} item>
        <Component {...fieldProps} />
      </Grid>
    );
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { formData } = this.props;
    const validation = validateFormData(formData.pharmacie);
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
      console.log('formData.pharmacie.pharmacie.formeJuridique.value', formData.pharmacie.pharmacie.formeJuridique.value);
      this.props.dispatch(
        addPharmacie(
          {
            ...formData.pharmacie,
            // pharmacie: {
            //   ...formData.pharmacie.pharmacie,
            //   formeJuridique: formData.pharmacie.pharmacie.formeJuridique.value,
            // },
            ville: {
              id: _.get(formData.pharmacie, 'ville.value'),
            },
            region: {
              id: _.get(formData.pharmacie, 'region.value'),
            },
            formeJuridique: _.get(formData.pharmacie, 'formeJuridique.value', ''),
          },
          this.handleSubmitResponse,
        ),
      );
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
      const { successCallback } = this.props;
      if (successCallback) {
        successCallback(response);
      }
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

  render() {
    const { classes, handleFormDataChange } = this.props;
    const { errors, isSuccess } = this.state;
    console.log('classes', this.props);
    return (
      <div>
        <Typography variant="h5" color="primary" className={classes.inputs} style={{ width: '700px', maxWidth: '100%' }}>
          Informations pharmacie
        </Typography>
        <form onSubmit={this.handleFormSubmit}>
          <Grid alignContent="center" justify="flex-start" alignItems="center" container>
            <Grid xs={12} item />
            <Grid xs={10} item>
              <ErrorsArea prefix="Vous avez les erreurs suivantes" errors={errors.messages} />
            </Grid>
          </Grid>
          <Grid alignContent="center" justify="center" alignItems="center" container>
            {pharmacieFields.map(field => this.renderField(field, classes))}
          </Grid>
          {/* <Grid alignContent="center" justify="center" alignItems="center" container>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={this.handleFormSubmit}
            >
              Valider
            </Button>
          </Grid> */}
          <Grid justify="center" container style={{ marginTop: 10, marginBottom: 20 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.props.handleSubmit}
              className={classes.buttonajout}
            >
              Valider
            </Button>
            <Button type="submit" variant="contained" color="primary" className={classes.buttons} style={{ marginLeft: 10 }}>
              ANNULER
            </Button>
          </Grid>
        </form>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={<span id="message-id">La pharmacie a été crééee avec succès.</span>}
            action={[
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

AddPharmacieContainer.defaultProps = {};

AddPharmacieContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  successCallback: PropTypes.func,
  id: PropTypes.number.isRequired,
};
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  regions: selectRegions(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AddPharmacieContainer);
