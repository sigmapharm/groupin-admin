import React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
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
import { formatLaboratoireToLabelValue } from './utils';
import { createArticle } from '../actions';
import { makeSelectLaboratoires } from '../../App/selectors';
import  AddArticleForm  from '../../../components/articles/add/AddAricleFrom';
import  AddLaboratoireContainer  from '../../laboratoire/add';
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
     reference:'',
     nom :'',
     gamme :'',
     codebare:'',
     categorie:'',
     classe_therapeutique:'',
     dci:'',
     pph:'',
     tva:'',
    neccissite_prescription:'',
    produit_Marche:'',
},
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
  isAddLaboratoire: false,
};



export class AddArticle extends React.PureComponent {
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

  handleLaboratoireSelectChange = value => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
        laboratoire: value,
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
      this.props.dispatch(createArticle(formattedData,this.handleSubmitResponse));
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

  handleGoToArticlesList = () => {
    history.push('/articles');
  };

  handleAddlaboratoireOpen = () => {
    this.setState({
      isAddLaboratoire:true,
    });
  };

  handleAddLaboratoireClose = () => {
    this.setState({
      isAddLaboratoire:false,
    });
  };

  handleAddLaboratoireSuccess = newLaboratoire => {
    const { formData } = this.state;
    this.setState({
      formData: {
        ...formData,
  laboratoire: formatLaboratoireToLabelValue(newLaboratoire),
      },
      isAddLaboratoire: false,
    });
  };

  render() {
    const { classes, laboratoires } = this.props;
    const { formData, errors, isSuccess } = this.state;
    const formattedLaboratoire = laboratoires.map(formatLaboratoireToLabelValue);
    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <AddArticleForm
            classes={classes}
            errors={errors}
            laboratoires={formattedLaboratoire}
            formData={formData}
            handleFormDataChange={this.handleFormDataChange}
            handleLaboratoireSelectChange={this.handleLaboratoireSelectChange}
            handleSubmit={this.handleSubmit}
            handleAddLaboratoireClick={this.handleAddlaboratoireOpen}
           />



        </form>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.isAddLaboratoire}
        >
          <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h5" color="primary">
              {`Ajouter un nouveau laboratoire`}
            </Typography>
            <IconButton
              aria-label="Close"
              className={classes.closeButton}
              onClick={this.handleAddLaboratoireClose}
            >
              <CloseIcon />
            </IconButton>
          </MuiDialogTitle>
          <MuiDialogContent>
            < AddLaboratoireContainer
              successCallback={this.handleAddLaboratoireSuccess}
            />
          </MuiDialogContent>

        </Dialog>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={
              <span id="message-id">L'article a été créé avec succès.</span>
            }
            action={[
              <Button
                key="undo"
                color="secondary"
                size="small"
                onClick={this.handleGoToArticlesList}
              >
                Liste des Articles
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'articles', saga });

AddArticle.defaultProps = {};

AddArticle.propTypes = {
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
  withSaga,
 authenticated,
)(AddArticle);
