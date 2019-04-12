import React from 'react';
import * as PropTypes from 'prop-types';

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
// import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { createStructuredSelector } from 'reselect';
import {
  defaultOptionsFormatter,
  pharmacieFields,
  validateFormData,
} from './fields';
// import reducer from './reducer';
import sagas from './sagas';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import { addPharmacie } from './actions';
import ErrorsArea from '../../../components/ErrorsArea';
// import messages from './messages';

/* istanbul ignore next */
const styles = () => ({
  fieldContainer: {
    maxWidth: '500px',
    minWidth: '500px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
});

const initialState = {
  formData: {
    denomination: '',
    adresse: '',
    tel: '',
    fax: '',
    gsm: '',
    patente: '',
    numRC: '',
    interlocuteur: '',
    fonction: '',
    formeJuridique: '',
    banque: '',
    dateDemarrage: '',
    dateCreation: '',
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

  handleInputChange = e => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSelectChange = name => value => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [name]: (value && value.value) || '',
      },
    });
  };

  getRenderedProps = field => {
    const { formData } = this.state;
    let props = {
      name: field.name,
      label: field.label,
      value:
        (field.formatter && field.formatter(formData[field.name])) ||
        formData[field.name],
      fullWidth: true,
      onChange: this.handleInputChange,
      error:
        this.state.errors &&
        this.state.errors.fields &&
        this.state.errors.fields[field.name],
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
        options: (field.options || this.props[field.fromProps]).map(
          defaultOptionsFormatter,
        ),
        onChange: this.handleSelectChange(field.name),
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
      <Grid
        key={field.id}
        className={classes.fieldContainer}
        xs={8}
        md={4}
        item
      >
        <Component {...fieldProps} />
      </Grid>
    );
  };

  handleFormSubmit = e => {
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
      this.props.dispatch(
        addPharmacie({ ...formData }, this.handleSubmitResponse),
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
    const { classes } = this.props; // eslint-disable-line
    const { errors, isSuccess } = this.state;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <Grid
            alignContent="center"
            justify="center"
            alignItems="center"
            container
          >
            <Grid xs={12} item />
            <Grid xs={12} item>
              <ErrorsArea
                prefix="Vous avez les erreurs suivantes"
                errors={errors.messages}
              />
            </Grid>
          </Grid>
          <Grid
            alignContent="center"
            justify="center"
            alignItems="center"
            container
          >
            {pharmacieFields.map(field => this.renderField(field, classes))}
          </Grid>
          <Grid
            alignContent="center"
            justify="center"
            alignItems="center"
            container
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              Valider
            </Button>
          </Grid>
        </form>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={
              <span id="message-id">
                La pharmacie a été crééee avec succès.
              </span>
            }
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={this.handleCloseSuccessMessage}
              >
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
};
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'addPharmacie', saga: sagas });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(AddPharmacieContainer);
