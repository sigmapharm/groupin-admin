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
import saga from '../saga';

import injectSaga from '../../../utils/injectSaga';
import reducer from '../../App/reducer';
import injectReducer from '../../../utils/injectReducer';
import {validateFormData }  from './validation';
import { createOffre, } from '../actions';
import  AddOffreForm  from '../../../components/offres/add/AddOffreForm';
import { formatLaboratoireToLabelValue } from './utils';
import { makeSelectLaboratoires } from '../../App/selectors';
import { getArticleslaboList } from '../../Articles/actions';
import { makeSelectArticlesList, makeSelectarticlesListlabo } from '../../Articles/selectors';
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
    designation:'',
    dateDebut:'',
    dateFin:'',
    montant:'',
    quantiteMin:'',
    status:'',
    montantMax:'',
    laboratoire:'',

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
          id:formData.laboratoire && formData.laboratoire.value,
        },

 };
 this.props.dispatch(createOffre(formattedData,this.handleSubmitResponse));
    }

  };

 componentDidMount() {this.props.dispatch(getArticleslaboList(this.state));}

  handleChangeLaboratoire = (laboratoire) => {
    this.setState({ laboratoire }, () =>
      this.props.dispatch(getArticleslaboList(this.state)),
    );
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
  const {formData} = this.state;
    this.setState(
      {
        formData: {
          ...formData,
          laboratoire: value.label,
        },
      },
    () => {
        console.log("value :", value);
      console.log("formData :", formData);
        this.props.dispatch(getArticleslaboList(this.state));
     }
    );

/* const { formData ,laboratoire} = this.state;
     this.setState({
      formData: {
        ...formData,
        laboratoire: value,

     },
      articles:this.handleChangeLaboratoire(value.id && value.nom),

    });*/
  };

  handleCloseSuccessMessage = () => {
    this.setState({ isSuccess: false });
  };

  handleGoToOffresList = () => {
    history.push('/offres');
  };


  render() {
    const { classes,laboratoires,articlesList,articlesListlabo } = this.props;
    const { formData, errors, isSuccess } = this.state;
    const formattedLaboratoire = laboratoires.map(formatLaboratoireToLabelValue);
    const totalElements = articlesList.totalElements ? articlesList.totalElements : 0;
    //const rows = articlesList.content;
    const rows = articlesListlabo ? articlesListlabo.content : [];
    console.log(totalElements);
    console.log("RENDER :", rows);
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
            message={
              <span id="message-id">L'offre a été créé avec succès.</span>
            }
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
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  laboratoires: makeSelectLaboratoires(),
  articlesList:makeSelectArticlesList(),
 articlesListlabo:makeSelectarticlesListlabo(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'offres',saga });

AddOffre.defaultProps = {};


AddOffre.propTypes = {
 articlesList: PropTypes.any,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  laboratoires: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nom: PropTypes.string.isRequired,
    }),
  ),
};

const withReducer = injectReducer({ key: 'global', reducer });

export default compose(
  withStyles(styles),
  withReducer,
  withConnect,
 // withSagaarticles,
  withSaga,
  authenticated,
)(AddOffre);
