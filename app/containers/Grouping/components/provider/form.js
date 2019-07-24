/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button/Button';
import _ from 'lodash';
import SingleAutoCompleteSelect from '../../../../components/AutoCompleteSelect';
import { fields, validateFormData } from './formFields';
import { createNewProvider } from '../../store/actions.creators';
import { getAllCities } from '../../store/selectors';
import authenticated from '../../../HOC/authenticated/authenticated';
import ErrorsArea from '../../../../components/ErrorsArea';
import InfoBar from '../../../../components/Snackbar/InfoBar';

const styles = () => ({
  gridContainer: {
    minWidth: '600px',
  },
  gridItem: {
    padding: '0px 12px',
  },
  selectItem: {
    marginTop: '13px',
  },
  btnsContainer: {
    marginTop: '10px',
    justifyContent: 'flex-end',
  },
  btnItem: {
    marginLeft: '10px',
  },
});

class ProviderForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { formData } = this.state;
    const { onAddSuccess, createNewProvider } = this.props;
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
      const formattedData = _.omit(
        {
          ...formData,
          cityName: formData.city.value,
        },
        'city',
      );
      createNewProvider(
        formattedData,

        err => {
          if (err) {
            this.setState({
              showInfoBar: true,
              infoBarParams: {
                title: 'Une erreur est survenue ',
              },
            });
          } else {
            onAddSuccess();
          }
        },
      );
    }
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  onTextInputChange = ({ target: { name, value } }) => {
    this.updateFormData(name, value);
  };

  onSelectChange = name => value => {
    this.updateFormData(name, value);
  };

  formatCities = city => city && { label: city.name, value: city.name };

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        fullName: '',
        email: '',
        phone: '',
        fax: '',
        city: null,
      },
      errors: {
        fields: {},
        messages: {},
      },
      isSuccess: false,
      showInfoBar: false,
      infoBarParams: {},
    };
  }

  updateFormData(name, value) {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        [name]: value,
      },
    });
  }

  render() {
    const { classes, cities } = this.props;
    const { errors, showInfoBar, infoBarParams } = this.state;
    const formattedCities = _.map(cities, this.formatCities);
    return (
      <Grid className={classes.gridContainer} container>
        <Grid xs={12} item>
          <ErrorsArea
            variant="success"
            prefix="Vous avez les erreurs suivantes"
            errors={errors.messages}
          />
        </Grid>
        <Grid className={classes.gridItem} xs={12} md={6} item>
          <TextField
            name={fields.fullName.name}
            label={fields.fullName.label}
            onChange={this.onTextInputChange}
            fullWidth
          />
        </Grid>
        <Grid className={classes.gridItem} xs={12} md={6} item>
          <TextField
            name={fields.email.name}
            label={fields.email.label}
            onChange={this.onTextInputChange}
            fullWidth
          />
        </Grid>
        <Grid className={classes.gridItem} xs={12} md={6} item>
          <TextField
            name={fields.phone.name}
            label={fields.phone.label}
            onChange={this.onTextInputChange}
            fullWidth
          />
        </Grid>
        <Grid className={classes.gridItem} xs={12} md={6} item>
          <TextField
            name={fields.fax.name}
            label={fields.fax.label}
            onChange={this.onTextInputChange}
            fullWidth
          />
        </Grid>
        <Grid
          className={`${classes.gridItem} ${classes.selectItem}`}
          xs={12}
          md={12}
          item
        >
          <SingleAutoCompleteSelect
            name={fields.city.name}
            options={formattedCities}
            placeholder={fields.city.label}
            onChange={this.onSelectChange(fields.city.name)}
            isClearable
          />
        </Grid>
        <Grid className={classes.btnsContainer} container>
          <Button type="submit" variant="contained" color="primary">
            Annuler
          </Button>
          <Button
            className={classes.btnItem}
            type="submit"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Ajouter
          </Button>
        </Grid>
        <InfoBar
          open={showInfoBar}
          onClose={this.closeInfoBar}
          {...infoBarParams}
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createNewProvider,
    },
    dispatch,
  );

const mapStateToProps = createStructuredSelector({
  cities: getAllCities(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(ProviderForm);
