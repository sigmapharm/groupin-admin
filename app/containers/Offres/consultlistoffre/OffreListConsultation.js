import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import history from 'utils/history';
import _ from 'lodash';
import InfoBar from '../../../components/Snackbar/InfoBar';
import { selectOfferArticleList } from '../selectors';
// import { makeSelectoffreArticledtos } from '../../App/selectors';
import { changeOfferArticle, loadArticleOffer, submitClientCommand } from '../actions';
import { makeSelectUser } from '../../App/selectors';
import { SUPER_ADMIN } from '../../AppHeader/Roles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    color: '#fff000',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  input: {
    color: 'black',
  },
  dense: {
    marginTop: 19,
  },
  MuiInputBaseInput5355: {
    color: 'red',
  },
  menu: {
    width: 200,
  },
  metaContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '10px',
  },
  metaItems: {
    paddingRight: '2em',
    display: 'inline-block',
  },
  commandButton: {
    marginTop: '15px',
  },
  cancelButton: {
    marginTop: '15px',
    marginRight: '10px',
  },
  hasError: {
    backgroundColor: '#ff000042',
  },
});

export class OffreListConsultation extends React.PureComponent {
  handleQuantityChange = (id, minQuantity) => ({ target: { value } }) => {
    this.props.dispatch(
      changeOfferArticle({
        id,
        quantity: +value,
        hasError: value && +value < minQuantity,
      }),
    );
  };

  // handSelectArticleChange = id => ({ target: { checked } }) => {
  //   this.props.dispatch(
  //     changeOfferArticle({
  //       id,
  //       selected: checked,
  //     }),
  //   );
  // };

  handleSubmitResponse = (err, response) => {
    if (_.isEmpty(err)) {
      const { dismiss } = this.props;
      dismiss();
      history.push('/commands');
    } else {
      const {
        errors: { error },
      } = response;
      this.setState({
        showInfoBar: true,
        infoBarParams: {
          title: error,
        },
      });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      showInfoBar: false,
      infoBarParams: {},
    };
  }

  get allowCommandSubmit() {
    const { offerArticles } = this.props;

    return offerArticles.filter(({ quantity, minQuantity }) => quantity >= minQuantity).length > 0 &&
      offerArticles.filter(({ quantity }) => quantity > 0).every(({ hasError }) => hasError === false)
      ? true
      : false;
  }

  get forAdmin() {
    const {
      user: { role },
    } = this.props;
    return role === SUPER_ADMIN;
  }

  get isCommandAllowed() {
    const { totalRemise, row } = this.props;

    console.log(row);

    const isEqual = totalRemise === parseInt(row.minToOrder) ? true : false;

    const isGreater = totalRemise > parseInt(row.minToOrder) ? true : false;

    if (!row.minToOrder) {
      return !this.allowCommandSubmit;
    }

    if (this.allowCommandSubmit && (isEqual || isGreater)) {
      return false;
    }

    return true;
  }

  componentWillMount() {
    const {
      dispatch,
      row: { id },
    } = this.props;
    dispatch(
      loadArticleOffer({
        id,
        callback: err => {
          if (err) {
            this.setState({
              showInfoBar: true,
              infoBarParams: {
                title: "Le chargement des articles a échoué merci de contacter l'administrateur ",
              },
            });
          }
        },
      }),
    );
  }

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  render() {
    const { row, classes, remainingDays, hasStarted, progress, offerArticles, commandMode, dismiss } = this.props;
    const { showInfoBar, infoBarParams } = this.state;

    console.log(row);

    const datefin = new Date(row.dateFin);
    const startDate = new Date(row.dateDebut);
    const joursLabel = remainingDays === 1 ? 'jour' : 'jours';
    // const avancementMontant = Math.min(row.montant / 100000, 1) * 100;

    const dateformat = new Intl.DateTimeFormat('fr-FR').format(datefin);
    const startDateFormated = new Intl.DateTimeFormat('fr-FR').format(startDate);

    return (
      <React.Fragment>
        <div className={classes.metaContainer}>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Designation</Typography>
            <Typography variant="h6" component="h2">
              {row.designation}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Laboratoire</Typography>
            <Typography variant="h6" component="h2">
              {row.laboratoryName}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Date Début</Typography>
            <Typography variant="h6" component="h2">
              {startDateFormated}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Date fin</Typography>
            <Typography variant="h6" component="h2">
              {dateformat}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Status</Typography>
            <Typography variant="h6" component="h2">
              {row.status}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Commentaire</Typography>
            <Typography variant="h6" component="h2">
              {row.comment}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Escompte</Typography>
            <Typography variant="h6" component="h2">
              {row.globalDiscount} %
            </Typography>
          </div>
          {this.forAdmin && (
            <>
              <div className={classes.metaItems}>
                <Typography color="textSecondary">Montant Objectif</Typography>
                <Typography variant="h6" component="h2">
                  {row.montant}
                </Typography>
              </div>
              <div className={classes.metaItems}>
                <Typography color="textSecondary">Montant Max</Typography>
                <Typography variant="h6" component="h2">
                  {row.montantMax}
                </Typography>
              </div>
            </>
          )}
        </div>
        {/*
         <div
          className={classes.metaContainer}
          style={{ justifyContent: 'center' }}
        >
          <div style={{ width: '25%', marginTop: '28px' }}>
            <Progressbar progress={progress} />
            {remainingDays > 0 // eslint-disable-line
              ? hasStarted
                ? `Il reste ${remainingDays} ${joursLabel}`
                : `L'offre n'a pas encore commencé`
              : 'Offre clôturée !'}
          </div>
          {/*
          <div style={{ width: '25%', marginTop: '28px' }}>
            <Progressbar progress={avancementMontant} />
            {row.montant} MAD {avancementMontant}%
          </div>

      </div>

        */}

        <Table>
          <TableHead>
            <TableRow>
              {/* {commandMode && <TableCell />} */}
              <TableCell>Désignation</TableCell>
              <TableCell>PPV</TableCell>
              <TableCell>
                PPH{' '}
                <hr
                  style={{
                    width: '30%',
                    marginLeft: '0',
                    height: '3px',
                    backgroundColor: 'red',
                  }}
                />
              </TableCell>
              <TableCell>
                Remise (%)
                <hr
                  style={{
                    width: '30%',
                    marginLeft: '0',
                    height: '3px',
                    backgroundColor: 'red',
                  }}
                />
              </TableCell>
              <TableCell>
                PPH Remise
                <hr
                  style={{
                    width: '45%',
                    marginLeft: '0',
                    height: '3px',
                    backgroundColor: 'red',
                  }}
                />
              </TableCell>
              <TableCell>
                Quantité Minimal
                <hr
                  style={{
                    width: '45%',
                    marginLeft: '0',
                    height: '3px',
                    backgroundColor: 'red',
                  }}
                />
              </TableCell>
              {this.forAdmin && (
                <TableCell>
                  Quantité Commandée
                  <hr
                    style={{
                      width: '45%',
                      marginLeft: '0',
                      height: '3px',
                      backgroundColor: 'red',
                    }}
                  />
                </TableCell>
              )}
              {commandMode && (
                <TableCell>
                  Quantité
                  <hr
                    style={{
                      width: '45%',
                      marginLeft: '0',
                      height: '3px',
                      backgroundColor: 'red',
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {offerArticles.map(
              ({ id, nom, ppv, pph, discount, computedPPH, quantity, minQuantity, hasError, selected, quantityCmd }) => (
                <TableRow
                  {...(hasError ? { className: classes.hasError } : {})}
                  key={id}
                  style={{ backgroundColor: quantity >= minQuantity ? '#4d609c70' : undefined }}
                >
                  {/* {commandMode && (
                    <TableCell>
                      <Checkbox
                        onChange={this.handSelectArticleChange(id)}
                        checked={!!selected}
                      />
                    </TableCell>
                  )} */}
                  <TableCell>{nom}</TableCell>
                  <TableCell>{ppv.toFixed(2)}</TableCell>
                  <TableCell>{pph.toFixed(2)}</TableCell>
                  <TableCell>{discount}</TableCell>
                  <TableCell>{computedPPH.toFixed(2)}</TableCell>
                  <TableCell>{minQuantity}</TableCell>
                  {this.forAdmin && <TableCell>{quantityCmd}</TableCell>}
                  {commandMode && (
                    <TableCell>
                      <TextField
                        name="quantity"
                        label="Quantité"
                        type="number"
                        // value={quantity || ''}
                        //disabled={!selected}
                        autoComplete="off"
                        inputProps={{ maxLength: 100 }}
                        onChange={this.handleQuantityChange(id, minQuantity)}
                        fullWidth
                      />
                    </TableCell>
                  )}
                </TableRow>
              ),
            )}
            {/* {commandMode && (
              <TableRow>
                <TableCell style={{ textAlign: 'right' }} colSpan={7}>
                  Total Commande:
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {_.sumBy(offerArticles, ({ quantity, pph }) => pph * quantity || 0).toFixed(2)}
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
        {commandMode && (
          <Grid justify="center" container>
            <Button className={classes.cancelButton} type="submit" variant="contained" color="primary" onClick={dismiss}>
              Annuler
            </Button>
            <Button
              className={classes.commandButton}
              type="submit"
              variant="contained"
              color="primary"
              disabled={this.isCommandAllowed}
              onClick={() =>
                this.allowCommandSubmit &&
                this.props.dispatch(
                  submitClientCommand(
                    {
                      offerId: row.id,
                      offerArticles,
                    },
                    this.handleSubmitResponse,
                  ),
                )
              }
            >
              Commander
            </Button>
          </Grid>
        )}
        {this.isCommandAllowed && commandMode && this.props.totalRemise > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, color: 'red' }}>
            Votre commande n'a pas encore atteint le minimum à commander défini par le laboratoire
          </div>
        ) : null}
        <InfoBar open={showInfoBar} onClose={this.closeInfoBar} {...infoBarParams} />
      </React.Fragment>
    );
  }
}

OffreListConsultation.defaultProps = {
  row: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  createStructuredSelector({
    offerArticles: selectOfferArticleList(),
    user: makeSelectUser(),
  }),
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(OffreListConsultation);
