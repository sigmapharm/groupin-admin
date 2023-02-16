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
import authenticated from '../HOC/authenticated/authenticated';
import InfoBar from '../../components/Snackbar/InfoBar';
import { makeSelectAdsAdd } from './selectors';
import {
  changeAdsdata,
  changeAlertdata,
  createAds,
  fillALertInputs,
  fillAdsInput,
  getAdsData,
  updateALert,
  updateAdsData,
} from './actions';
import { AddADSFrom } from '../../components/addAds/addAdsForm';

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
    content: '',
    endAt: '',
    link: '',
    startFrom: '',
    image: '',
  },
  errors: {
    fields: {},
    messages: {},
  },
  isSuccess: false,
  showInfoBar: false,
  infoBarParams: {},
  alertId: null,
  path: '',
};

// Change component name later
export class AddAds extends React.PureComponent {
  state = { ...initialState };

  componentWillMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.setState({ id });

    this.props.dispatch(getAdsData({ id }));

    this.setState({ path: this.props.adsDeatil.image });

    // this.props.dispatch(fillAdsInput(this.props.adsDeatil));
  }

  // TODO : debounce event handler later
  handleFormDataChange = (e, v, file) => {
    if (file) {
      const {
        target: { files, name },
      } = e;
      this.props.dispatch(
        changeAdsdata({
          [name]: files,
        }),
      );
      return;
    }

    if (e.target) {
      const {
        target: { name, value },
      } = e;
      this.props.dispatch(
        changeAdsdata({
          [name]: value,
        }),
      );
      return;
    }

    this.props.dispatch(
      changeAdsdata({
        [v]: e.value,
      }),
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    const { editMode } = this.state;
    const { adsDeatil } = this.props;
    const validation = false;
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
        updateAdsData({
          data: adsDeatil,
          image_path: this.state.path,
          id: this.state.id,
          callback: (res, err) => {
            console.log('err', err);
            if (err) {
              this.setState({
                showInfoBar: true,
                infoBarParams: {
                  title: "modification d'un Ads  a échoué merci de contacter l'administrateur ",
                },
              });
            } else {
              this.setState({
                showInfoBar: true,
                infoBarParams: {
                  title: 'Ads  à été modifiér avec succés',
                },
              });
              this.handleGoToLaboratoiresList();
            }
          },
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

  handleGoToLaboratoiresList = () => {
    console.log('history', history);
    history.push('/alerts');
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { classes, adsDeatil } = this.props;
    const { formData, errors, isSuccess, editMode, showInfoBar, infoBarParams } = this.state;

    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <AddADSFrom
            classes={classes}
            errors={errors}
            editMode={editMode}
            formData={adsDeatil}
            handleFormDataChange={this.handleFormDataChange}
            handleSubmit={this.handleSubmit}
            handleAnuler={this.handleGoToLaboratoiresList}
          />
        </form>

        {isSuccess && (
          <Snackbar
            open
            TransitionComponent={Fade}
            message={<span id="message-id">Ads a été {editMode ? 'mis à jour ' : 'créé'} avec succès.</span>}
            action={[
              <Button key="undo" color="secondary" size="small" onClick={this.handleGoToLaboratoiresList}>
                Liste des Ads
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
  adsDeatil: makeSelectAdsAdd(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

AddAds.defaultProps = {};

AddAds.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
};

export default compose(
  withStyles(styles),
  withConnect,
  authenticated,
)(AddAds);
