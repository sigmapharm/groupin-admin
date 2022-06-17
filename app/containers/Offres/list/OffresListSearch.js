import React from 'react';
import _ from 'lodash';
import * as PropTypes from 'prop-types';
import { compose } from 'redux';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import SingleAutoCompleteSelect from '../../../components/AutoCompleteSelect';
import {
  makeSelectdateDebut,
  makeSelectdateFin,
  makeSelectdesignation,
  makeSelectlaboratoire,
  makeSelectmontantObjectif,
  makeSelectOffresList,
  makeSelectPage,
  makeSelectquantiteMinimale,
  makeSelectRowsPerPage,
  makeSelectstatus,
} from '../selectors';
import { makeSelectUser } from '../../App/selectors';
import { WithRoles } from '../../WithRoles';
import { ADMIN, MEMBRE, SUPER_ADMIN } from '../../AppHeader/Roles';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,

    marginLeft: '10%',
  },
  filtersSection: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    // marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    width: 200,
  },
  button: {
    // margin: theme.spacing.unit,
  },
  select: {
    marginTop: theme.spacing.unit * 2,
    width: 250,
  },
});

export class OffresListSearch extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      user: { role },
    } = props;
    this.state = {
      status: role === MEMBRE ? { label: 'En cours', value: 'En cours' } : null,
    };
  }

  render() {
    const { status } = this.state;
    const {
      classes,
      handleChange,
      handleSearchOffres,
      user: { role },
    } = this.props; // eslint-disable-line
    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h6">
          Recherche
        </Typography>
        <div className={classes.filtersSection}>
          <TextField
            name="designation"
            label="Désignation"
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
            value={this.props.designation ? this.props.designation : undefined}
          />
          <TextField
            name="laboratoire"
            label="Laboratoire"
            className={classes.textField}
            margin="normal"
            onChange={handleChange}
          />
          {/* <TextField
          name="status"
          label="Status d'offre"
          defaultValue=""
          className={classes.textField}
          margin="normal"
          onChange={handleChange}
        /> */}
          <SingleAutoCompleteSelect
            className={classes.select}
            name="laboratoire"
            options={[
              { label: 'En attente', value: 'En attente' },
              { label: 'Cloturé', value: 'Cloturé' },
              { label: 'En cours', value: 'En cours' },
            ]}
            onChange={status => {
              this.setState({ status });
              handleChange({
                target: { name: 'status', value: _.get(status, 'value', '') },
              });
            }}
            value={status}
            placeholder="Status"
            isClearable
          />

          <Fab color="primary" className={classes.button} onClick={handleSearchOffres}>
            <SearchIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

OffresListSearch.defaultProps = {};

OffresListSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearchOffres: PropTypes.func.isRequired,
};

export default compose(
  withConnect,
  withStyles(styles),
)(OffresListSearch);
