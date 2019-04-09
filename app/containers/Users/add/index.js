import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import history from 'utils/history';

import authenticated from '../../HOC/authenticated/authenticated';
import PersonalInfo from './PersonalInfo';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import ErrorsArea from '../../../components/ErrorsArea';
import { validateFormData } from './validation';
import { createUser } from '../actions';
import saga from '../saga';
import injectSaga from '../../../utils/injectSaga';
import { makeSelectPharmacies } from '../../App/selectors';
import { formatPharmacieToLabelValue } from './utils';
import reducer from '../../App/reducer';
import injectReducer from '../../../utils/injectReducer';

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
    pharmacie: '',
  },
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
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
    const validation = validateFormData(this.state.formData);
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
        createUser(this.state.formData, this.handleSubmitResponse),
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

  handleGoToUsersList = () => {
    history.push('/');
  };

  render() {
    const { classes, pharmacies } = this.props;
    const { formData, errors, isSuccess } = this.state;
    const formattedPharmacies = pharmacies.map(formatPharmacieToLabelValue);
    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h5" color="primary">
              {`Informations personnelles`}
            </Typography>
            <Grid
              className={classes.gridContainer}
              spacing={8}
              justify="center"
              alignItems="center"
              container
            >
              <Grid xs={12} item>
                <ErrorsArea
                  variant="success"
                  prefix="Vous avez les erreurs suivantes"
                  errors={errors.messages}
                />
              </Grid>
              <PersonalInfo
                formData={formData}
                errors={errors.fields}
                onChange={this.handleFormDataChange}
                maxLength={30}
              />
              <Grid xs={12} md={6} item>
                {formattedPharmacies && (
                  <Grid alignContent="center" container>
                    <Grid xs={11} item>
                      <SingleAutoCompleteSelect
                        className={classes.select}
                        name="pharmacie"
                        options={formattedPharmacies}
                        onChange={this.handlePharmacieSelectChange}
                        value={formData.pharmacie}
                        placeholder="Pharmacie"
                        isClearable
                      />
                    </Grid>
                    <Grid xs={1} item>
                      <Fab size="small" color="primary">
                        <AddIcon />
                      </Fab>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid xs={12} md={6} item />
              <Grid xs={12} item />
              <Grid justify="center" container>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  Valider
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={
              <span id="message-id">{`L'utilisateur a été créé avec succès.`}</span>
            }
            action={[
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleGoToUsersList}
              >
                Liste des utilisateurs
              </Button>,
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

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  pharmacies: makeSelectPharmacies(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'users', saga });

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

const withReducer = injectReducer({ key: 'global', reducer });

export default compose(
  withStyles(styles),
  withReducer,
  withConnect,
  withSaga,
  authenticated,
)(AddUser);
