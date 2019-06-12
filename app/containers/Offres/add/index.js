import React from 'react';
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
import { createOffre } from '../actions';
import AddOffreForm from '../../../components/offres/add/AddOffreForm';
import { formatLaboratoireToLabelValue } from './utils';
import {
  makeSelectarticlesListlabo,
  makeSelectLaboratoires,
} from '../../App/selectors';
import { getArticleslaboList } from '../../App/actions';

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

  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
});

const initialState = {
  formData: {
    designation: '',
    dateDebut: '',
    dateFin: '',
    montant: '',
    quantiteMin: '',
    status: '',
    montantMax: '',
    laboratoire: '',
  },
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
};

export class AddOffre extends React.PureComponent {
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
        laboratoire: {
          id: formData.laboratoire && formData.laboratoire.value,
        },
      };
      this.props.dispatch(
        createOffre(formattedData, this.handleSubmitResponse),
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

  handleLaboratoireSelectChange = value => {
    const { formData } = this.state;

    this.setState(
      {
        formData: {
          ...formData,
          laboratoire: value,
        },
      },
      () => this.props.dispatch(getArticleslaboList(this.state)),
    );
  };

  handleCloseSuccessMessage = () => {
    this.setState({ isSuccess: false });
  };

  handleGoToOffresList = () => {
    history.push('/offres');
  };

  render() {
    const { classes, laboratoires, articlesListlabo } = this.props;
    const { formData, errors, isSuccess } = this.state;
    const formattedLaboratoire = laboratoires.map(
      formatLaboratoireToLabelValue,
    );
    const rows = articlesListlabo;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <AddOffreForm
            classes={classes}
            errors={errors}
            formData={formData}
            rows={rows}
            laboratoires={formattedLaboratoire}
            handleFormDataChange={this.handleFormDataChange}
            handleSubmit={this.handleSubmit}
            handlelabchange={this.handleChangeLaboratoire}
            handleLaboratoireSelectChange={this.handleLaboratoireSelectChange}
            handleAnuler={this.handleGoToOffresList}
          />
        </form>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={<span id="message-id">Offre a été créé avec succès.</span>}
            action={[
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleGoToOffresList}
              >
                Liste des offres
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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  laboratoires: makeSelectLaboratoires(),
  articlesListlabo: makeSelectarticlesListlabo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

AddOffre.defaultProps = {};
AddOffre.propTypes = {
  articlesListlabo: PropTypes.any,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  laboratoires: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired,
    }),
  ),
};

export default compose(
  withStyles(styles),
  withConnect,
  authenticated,
)(AddOffre);
