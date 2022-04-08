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
import _ from 'lodash';
import authenticated from '../../HOC/authenticated/authenticated';
import { validateArticleList, validateFormData } from './validation';
import {
  applyGlobalRemiseOrMinQt,
  changeArticleOffer,
  changeOfferFormData,
  clearOffer,
  createOrUpdateOffre,
  getOfferWithDetails,
  toggleCheckAll,
} from '../actions';
import AddOffreForm from '../../../components/offres/add/AddOffreForm';
import InfoBar from '../../../components/Snackbar/InfoBar';
import { formatLaboratoireToLabelValue } from './utils';
import { makeSelectLaboratoires } from '../../App/selectors';
import { getLaboArticlesList } from '../../App/actions';
import { getSelectedAllValue, makeSelectarticlesListlabo, selectOfferFormData, selectOriginalOfferFormData } from '../selectors';

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
    comment: '',
    globalDiscount: '',
    minToOrder: '',
  },
  globalMinQuantity: '',
  globalDiscountPerArticle: '',
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
};

// Change component name later
export class AddOffre extends React.PureComponent {
  handleFormDataChange = ({ target: { name, value } }) => {
    this.props.dispatch(changeOfferFormData({ [name]: value }));
  };

  handleSubmit = updateOnlyDate => e => {
    e.preventDefault();
    const { formData, offerId, editMode } = this.state;
    const { articlesListlabo, offerFormData } = this.props;
    let validation = validateFormData(offerFormData);
    validation = validateArticleList(validation, articlesListlabo);
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
        offerId,
        ...offerFormData,
        laboratoire: {
          id: offerFormData.laboratoryId,
        },
      };
      this.props.dispatch(
        createOrUpdateOffre(formattedData, articlesListlabo, updateOnlyDate, err => response => {
          if (err) {
            this.setState({
              showInfoBar: true,
              infoBarParams: {
                title: `  ${
                  editMode ? 'La Modification' : "L'ajoute"
                }  des commands a échoué merci de contacter l'administrateur `,
              },
            });
            this.handleSubmitResponse(response);
          } else {
            this.handleSubmitResponse(response);
          }
        }),
      );
    }
  };

  handleSubmitResponse = response => {
    const { errors, editMode } = this.state;
    if (_.isEmpty(response)) {
      if (editMode) {
        history.goBack();
        return;
      }
      this.setState({
        ...initialState,

        isSuccess: true,
      });
    } else if (response.errors) {
      this.setState({
        errors: {
          ...errors,
          messages: { ...response.errors },
        },
        isSuccess: false,
      });
    }
  };

  handleLaboratoireSelectChange = laboratory => {
    const { formData } = this.state;
    this.props.dispatch(
      changeOfferFormData({
        laboratoryId: laboratory.value,
        laboratoire: laboratory,
      }),
    );
    if (laboratory && laboratory.value && !!laboratory.label.trim()) {
      this.props.dispatch(getLaboArticlesList(laboratory));
    }
  };

  handleCloseSuccessMessage = () => {
    this.setState({ isSuccess: false });
  };

  handleGoToOffresList = () => {
    history.push('/offres');
  };

  handleArticleRowChange = payload => {
    this.props.dispatch(changeArticleOffer(payload));
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      showInfoBar: false,
      infoBarParams: {},
    };
  }

  toggleAllSelection = () => {
    const { dispatch } = this.props;
    dispatch(toggleCheckAll());
  };

  componentWillMount() {
    const {
      match: {
        params: { offerId },
      },
    } = this.props;
    this.setState(
      {
        editMode: !!offerId,
        offerId,
      },
      () => !!offerId && this.props.dispatch(getOfferWithDetails({ id: offerId })),
    );
  }

  componentWillUnmount() {
    this.props.dispatch(clearOffer());
  }

  onGlobalVarsChange = payload => {
    this.setState(payload);
  };

  applyGlobalVars = (key, keyPerArticle) => {
    const { dispatch } = this.props;
    const keyValue = _.get(this.state, key);
    console.log(keyValue);
    dispatch(applyGlobalRemiseOrMinQt({ [keyPerArticle]: keyValue }));
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { classes, laboratoires, articlesListlabo, offerFormData, originalOfferFormData, checkAllValue } = this.props;
    const { editMode, errors, isSuccess, showInfoBar, infoBarParams } = this.state;
    const formattedLaboratoire = laboratoires.map(formatLaboratoireToLabelValue);
    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <AddOffreForm
            editMode={editMode}
            classes={classes}
            errors={errors}
            toggleAllSelection={this.toggleAllSelection}
            checkAllValue={checkAllValue}
            formData={offerFormData}
            originalFormData={originalOfferFormData}
            rows={articlesListlabo}
            handleArticleRowChange={this.handleArticleRowChange}
            handleGlobalVarsChange={this.onGlobalVarsChange}
            applyGlobalVars={this.applyGlobalVars}
            laboratoires={formattedLaboratoire}
            handleFormDataChange={this.handleFormDataChange}
            handleSubmit={this.handleSubmit}
            handleLaboratoireSelectChange={this.handleLaboratoireSelectChange}
            onCancel={this.handleGoToOffresList}
          />
        </form>
        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={<span id="message-id">Offre a été créé avec succès.</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={this.handleGoToOffresList}>
                Liste des offres
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

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = createStructuredSelector({
  laboratoires: makeSelectLaboratoires(),
  articlesListlabo: makeSelectarticlesListlabo(),
  offerFormData: selectOfferFormData(),
  originalOfferFormData: selectOriginalOfferFormData(),
  checkAllValue: getSelectedAllValue(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

AddOffre.defaultProps = {};
AddOffre.propTypes = {
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
