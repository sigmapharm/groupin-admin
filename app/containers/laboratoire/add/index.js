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
import { createStructuredSelector } from 'reselect';
import { defaultOptionsFormatter, laboratoiresFields, validateFormData } from './fields';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import { addlaboratoire } from './actions';
import ErrorsArea from '../../../components/ErrorsArea';
import { selectRegions } from '../../App/selectors';
import { getRegions } from '../../App/actions';
import Select from '../../Reporting/inputsList/select';

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
  select: { marginTop: theme.spacing.unit },
});

const initialState = {
  formData: {
    nom: '',
    email: '',
    website: '',
    description: '',
    adresse: '',
    city: '',
    region: '',
    city: '',
  },
  errors: {
    messages: {},
    fields: {},
  },
  success: false,
};

export class AddLaboratoireContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      cities: [],
      cityName: '',
      regionName: '',
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
    console.log('value', value, 'name', name);
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [name]: value.value || '',
      },
    });
  };

  formatSelectVlaue = (__array, __criteria) => () => {
    return _.map(__array, item => {
      const obj = {
        value: item[__criteria.value],
        label: item[__criteria.label],
        id: item.id,
      };

      // check if there is any allowed keys

      if (__criteria && __criteria.allow) {
        _.map(__criteria.allow, key => {
          // map allowed key and set them with matched values

          _.merge(obj, {
            [key]: item[key],
          });
        });
      }

      return obj;
    });
  };

  getRenderedProps = field => {
    const { formData } = this.state;
    let props = {
      name: field.name,
      label: field.label,
      value: (field.formatter && field.formatter(formData[field.name])) || formData[field.name],
      fullWidth: true,
      onChange: this.handleInputChange,
      error: this.state.errors && this.state.errors.fields && this.state.errors.fields[field.name],
    };
    if (field.specialProps) {
      props = {
        ...props,
        ...field.specialProps,
      };
    }
    if (field.select) {
      console.log('field.option', field.option());
      props = {
        ...props,
        options: [],
        onChange: this.handleSelectChange(field.name),
        placeholder: field.placeholder,
        value: 'hello',
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
      <Grid key={field.id} className={classes.fieldContainer} xs={8} md={4} item>
        <Component {...fieldProps} />
      </Grid>
    );
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { formData } = this.state;
    const validation = formData;
    if (validation && validation.messages && validation.fields) {
      this.setState({
        errors: {
          ...validation,
        },
        isSuccess: false,
      });
    } else {
      //
      this.setState({
        errors: {
          fields: {},
          messages: {},
        },
      });
      //
      this.props.dispatch(addlaboratoire({ ...formData }, this.handleSubmitResponse));
    }
  };

  handleSubmitResponse = response => {
    console.log(response);
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

  componentDidMount() {
    this.props.dispatch(getRegions());
  }

  render() {
    const { classes } = this.props; // eslint-disable-line
    const { errors, isSuccess } = this.state;
    const { region = [] } = this.props;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <Grid alignContent="center" justify="center" alignItems="center" container>
            <Grid xs={12} item />
            <Grid xs={10} item>
              <ErrorsArea prefix="Vous avez les erreurs suivantes" errors={errors.messages} />
            </Grid>
          </Grid>
          <Grid alignContent="center" justify="center" alignItems="center" container>
            <div>
              {laboratoiresFields.map(field => {
                return this.renderField(field, classes);
              })}
            </div>
          </Grid>
          <Grid alignContent="center" justify="center" alignItems="center" container>
            <div style={{ width: 400, marginTop: 10 }}>
              <SingleAutoCompleteSelect
                placeholder="Region"
                options={this.formatSelectVlaue(region, { label: 'name', value: 'code', allow: ['cities'] })()}
                onChange={e => {
                  this.setState({ formData: { ...this.state.formData, region: e.value }, cities: e.cities, regionName: e });
                }}
                value={this.state.regionName || ''}
                classes={classes.fieldContainer}
              />
            </div>

            <div style={{ width: 400, marginTop: 10 }}>
              <SingleAutoCompleteSelect
                placeholder="Ville"
                options={this.formatSelectVlaue(this.state.cities, { label: 'name', value: 'code' })()}
                onChange={e => {
                  this.setState({ formData: { ...this.state.formData, city: e.value }, cityName: e });
                }}
                value={this.state.cityName || ''}
                classes={classes.fieldContainer}
              />
            </div>
          </Grid>

          <Grid alignContent="center" justify="center" alignItems="center" container>
            <Button type="submit" variant="contained" color="primary" onClick={this.handleFormSubmit} style={{ marginTop: 10 }}>
              Valider
            </Button>
          </Grid>
        </form>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={<span id="message-id">laboratoire a été crééee avec succès.</span>}
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

AddLaboratoireContainer.defaultProps = {};

AddLaboratoireContainer.propTypes = {
  classes: PropTypes.object,
  successCallback: PropTypes.func,
};
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  region: selectRegions(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AddLaboratoireContainer);
