import React from 'react';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';
import authenticated from '../../HOC/authenticated/authenticated';
import { validateFormData } from './validation';
import { changeProviderFormData, clearProviderForm, createProvider, getProviderDetails } from '../actions';
import AddProviderForm from '../../../components/providers/add/AddProviderFrom';
import InfoBar from '../../../components/Snackbar/InfoBar';
import { selecteProviderFormData } from '../selectors';
import { selectCities } from '../../App/selectors';
import { formatCityToLabelValue } from './utils';

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
});

const initialState = {
  formData: {
    fullName: '',
    phone: '',
    fax: '',
    email: '',
    cityName: '',
  },
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
  showInfoBar: false,
  infoBarParams: {},
};

// Change component name later
export class AddProvider extends React.PureComponent {
  state = { ...initialState };

  componentWillMount() {
    const {
      match: {
        params: { providerId },
      },
    } = this.props;
    this.setState(
      {
        editMode: !!providerId,
        providerId,
      },
      () => {
        !!providerId && this.props.dispatch(getProviderDetails({ id: providerId }));
      },
    );
  }

  componentWillUnmount() {
    this.props.dispatch(clearProviderForm());
  }

  // TODO : debounce event handler later
  handleFormDataChange = ({ target: { name, value } }) => {
    this.props.dispatch(
      changeProviderFormData({
        [name]: value,
      }),
    );
  };

  // handleProviderSelectChange = provider => {
  //   this.props.dispatch(changeProviderFormData({ provider }));
  // };

  handleSubmit = e => {
    e.preventDefault();
    const { providerId, editMode } = this.state;
    const { providerFormData } = this.props;
    const validation = validateFormData(providerFormData);
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
        ...providerFormData,
        providerId,
      };
      this.props.dispatch(
        createProvider(formattedData, err => res => {
          if (err) {
            if (editMode) {
              this.setState({
                showInfoBar: true,
                infoBarParams: {
                  title: "La modification a échoué merci de contacter l'administrateur ",
                },
              });
            } else {
              this.setState({
                showInfoBar: true,
                infoBarParams: {
                  title: "L'ajout d'un Grossiste  a échoué merci de contacter l'administrateur ",
                },
              });
            }
          } else {
            this.handleSubmitResponse(res);
          }
        }),
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

  handleGoToProvidersList = () => {
    history.push('/provider');
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    console.log('props', this.props);
    const { classes, providerFormData, cities } = this.props;
    const formattedCities = cities.map(formatCityToLabelValue);

    const { formData, errors, isSuccess, editMode, showInfoBar, infoBarParams } = this.state;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <AddProviderForm
            classes={classes}
            errors={errors}
            editMode={editMode}
            cities={formattedCities}
            formData={providerFormData}
            handleFormDataChange={this.handleFormDataChange}
            handleSubmit={this.handleSubmit}
            handleAnuler={this.handleGoToProvidersList}
          />
        </form>

        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={<span id="message-id">Le Grossiste a été {editMode ? 'mis à jour ' : 'créé'} avec succès.</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={this.handleGoToProvidersList}>
                Liste des Grossistes
              </Button>,
              <IconButton key="close" color="inherit" onClick={this.handleCloseSuccessMessage}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        )}
        <InfoBar open={showInfoBar} onClose={this.closeInfoBar} {...infoBarParams} />
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  providerFormData: selecteProviderFormData(),
  cities: selectCities(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

AddProvider.defaultProps = {};

AddProvider.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
};

export default compose(
  withStyles(styles),
  withConnect,
  authenticated,
)(AddProvider);
