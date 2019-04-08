import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import authenticated from '../../HOC/authenticated/authenticated';
import PersonalInfo from './PersonalInfo';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import ErrorsArea from '../../../components/ErrorsArea';
import { validateFormData } from './validation';
import { createUser } from '../actions';
import saga from "../saga";
import injectSaga from "../../../utils/injectSaga";

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

export class AddUser extends React.PureComponent {
  state = {
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
  };

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
      });
    } else {
      this.setState({
        errors: {
          fields: {},
          messages: {},
        },
      });
      this.props.dispatch(createUser(this.state.formData, () => alert('toto')));
    }
  };

  render() {
    const { classes } = this.props;
    const { formData, errors } = this.state;
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
                  prefix="Vous avez les erreurs suivants"
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
                <Grid alignContent="center" container>
                  <Grid xs={11} item>
                    <SingleAutoCompleteSelect
                      className={classes.select}
                      name="pharmacie"
                      options={[
                        { value: 1, label: 'toto' },
                        { value: 2, label: 'toto2' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                        { value: 3, label: 'toto3' },
                      ]}
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
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'users', saga });

AddUser.defaultProps = {};

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  withStyles(styles),
  withConnect,
  withSaga,
  authenticated,
)(AddUser);
