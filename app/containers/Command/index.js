import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators, compose } from 'redux';
import { withStyles, withWidth } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import Tooltip from '@material-ui/core/Tooltip';
import history from 'utils/history';
import moment from 'moment';
import _ from 'lodash';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import authenticated from '../HOC/authenticated/authenticated';
import styles from './style';
import Search from './components/search/index';
import searchFields from './searchFields';
import { commandHeaders, commandHeadersWithOption } from './headers';
import Table from '../../components/Table/index';
import CommandBody from './components/commands/metadata/index';
import OfferMetaData from './components/offer/metadata';
import { getCommandArticles, getCommandsList, getSubCommands } from './store/selectors';
import * as actionCreators from './store/actions.creators';
import Dialog from '../../components/Dialog/index';
import CommandFullDetail from './components/commands/details';
import InfoBar from '../../components/Snackbar/InfoBar';
import { makeSelectUser } from '../App/selectors';
import { ADMIN, SUPER_ADMIN, MEMBRE } from '../AppHeader/Roles';
import { clearSelectedOffer } from '../Offres/actions';
import { selectSelectedOffer } from '../Offres/selectors';

import GeneriqueDialog from '../../components/Alert';
import { isWidthDown } from '@material-ui/core/withWidth';
import CommandListCards from './components/responsive/CommandListCards';
import { saveAs } from 'file-saver';

const adminCols = [
  {
    label: 'Offre désignation',
    colName: 'offer.designation',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Laboratoire',
    colName: 'offer.laboratory.nom',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Pharmacie',
    colName: 'user.pharmacy.denomination',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Date de commande',
    colName: 'createdAt',
    selected: true,
    order: 'desc',
  },
  {
    label: 'Montant Remisé',
    colName: 'totalAmount',
    selected: false,
    order: 'asc',
  },
];

const memberCols = [
  {
    label: 'Offre désignation',
    colName: 'offer.designation',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Laboratoire',
    colName: 'offer.laboratory.nom',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Pharmacie',
    colName: 'user.pharmacy.denomination',
    selected: false,
    order: 'asc',
  },
  {
    label: 'Date de commande',
    colName: 'createdAt',
    selected: true,
    order: 'desc',
  },
  {
    label: 'Montant Remisé',
    colName: 'totalAmount',
    selected: false,
    order: 'asc',
  },

  {
    label: 'date de livraison',
    colName: 'deliveredAt',
    selected: false,
    order: 'asc',
  },
];

class Command extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      showCommandDetail: false,
      showSubCommands: false,
      selectedCommand: {},
      searchData: {
        laboratoryName: '',
        offerName: '',
      },
      showInfoBar: false,
      infoBarParams: {},
      showPopConfirmation: false,
      popConfirmationParams: {},
      cols: this.isMember ? memberCols : !this.isCommandsPage ? memberCols : adminCols,
      blobUrl: '',
      isTippyOpen: false,
    };
  }

  handleTippyToggle = () => {
    this.setState({ isTippyOpen: !this.state.isTippyOpen });
  };

  searchFields = searchFields(fieldData => {
    const { searchData } = this.state;
    this.setState({
      searchData: {
        ...searchData,
        ...fieldData,
      },
    });
  });

  onSearch = () => {
    const { searchData, cols } = this.state;
    const {
      match: {
        params: { offerId, callback },
      },
      commandPageable: { number, size },
      loadCommands,
    } = this.props;
    loadCommands({
      ...searchData,
      cols,
      offerId,
      size,
      page: number,
      isAggregate: this.forAdminCommands,
      callback: err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: "Le chargement des commands a échoué merci de contacter l'administrateur ",
            },
          });
        }
      },
    });
  };

  onDeleteSuccess = () => {
    this.closePopConfirmation();
    this.setState({
      showInfoBar: true,
      infoBarParams: {
        title: 'La commands a étè bien supprimé ',
      },
    });
    this.onSearch();
  };

  onPageChange = (event, page) => {
    const { searchData, cols } = this.state;
    const {
      loadCommands,
      commandPageable: { size },
      match: {
        params: { offerId },
      },
    } = this.props;
    loadCommands({
      ...searchData,
      offerId,
      size,
      page: +page,
      isAggregate: this.forAdminCommands,
      cols,
      callback: err => {
        if (err) {
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title: "le chargement des commands à échoué merci de contacter l'administrateur ",
            },
          });
        }
      },
    });
  };

  onPageSizeChange = ({ target: { value } }) => {
    const { searchData, cols } = this.state;
    const {
      commandPageable: { number },
      match: {
        params: { offerId },
      },
      loadCommands,
    } = this.props;
    loadCommands({
      ...searchData,
      offerId,
      size: +value,
      page: number,
      isAggregate: this.forAdminCommands,
      cols,
      callback: err => {
        if (err) {
          console.log('err', err);
          this.setState({
            showPopConfirmation: false,
            showInfoBar: true,
            infoBarParams: {
              title: "La pagination des commands à échoué merci de contacter l'administrateur ",
            },
          });
        }
      },
    });
  };

  deleteCommand = ({ commandId, canDelete, callback }) => () => {
    const { deleteCommand } = this.props;
    if (canDelete || this.forAdminCommands)
      deleteCommand({
        commandId,
        callback: err => {
          if (err) {
            this.setState({
              showPopConfirmation: false,
              showInfoBar: true,
              infoBarParams: {
                title: "Suppresion de commande  à échoué merci de contacter l'administrateur",
              },
            });
          } else {
            this.onDeleteSuccess();
          }
        },
        isAggregate: this.forAdminCommands,
      });
  };

  performDeleteCommand = ({ commandId, canDelete, callback }) => () => {
    this.openPopConfirmation({
      title: 'Suppression',
      textContent: 'Êtes-vous sûr de supprimer cette commande ? ',
      onClose: this.closePopConfirmation,
      onSubmit: this.deleteCommand({ commandId, canDelete, callback }),
    });
  };

  performDispatching = ({ commandId, offerId }) => () => {
    this.openPopConfirmation({
      title: 'livraison',
      textContent: 'marquer cette commande comme livrée ',
      onClose: this.closePopConfirmation,
      onSubmit: this.dispatchQuantity({ commandId, offerId }),
    });
  };

  showCommandDetail = row => () => {
    const { loadCommandArticles } = this.props;
    loadCommandArticles({
      commandId: row.commandId,
      isAggregate: this.forAdminCommands,
      callback: err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: " L'affichage de commande  à échoué merci de contacter l'administrateur ",
            },
          });
        } else {
          this.setState({
            isTippyOpen: false,
            update: false,
            showCommandDetail: true,
            selectedCommand: row,
          });
        }
      },
    });
  };

  updateCommandDetail = row => () => {
    const { loadCommandArticles } = this.props;
    loadCommandArticles({
      commandId: row.commandId,
      isAggregate: this.forAdminCommands,
      callback: err => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: " La modification d'une commande  à échoué merci de contacter l'administrateur",
            },
          });
        } else {
          this.setState({
            update: true,
            showCommandDetail: true,
            selectedCommand: row,
            isTippyOpen: false,
          });
        }
      },
    });
  };

  printCommand = row => () => {
    console.log(row);
    const { downloadCommandForm } = this.props;

    downloadCommandForm({
      commandId: row.commandId,
      callback: (err, blob) => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: " La génération du pdf à échoué merci de contacter l'administrateur",
            },
          });
        } else {
          const pdfBlob = new Blob([blob], { type: blob.type });
          saveAs(
            pdfBlob,
            `BC-${row.isAggregate ? row.laboratoryName : row.pharmacyName}/${moment(row.creationDate).format('DD/MM/YYYY')}-BC${
              row.commandId
            }`,
          );
        }
      },
    });

    this.setState({ isTippyOpen: false });
  };

  printFacture = row => () => {
    const { getDownloadFacture } = this.props;
    getDownloadFacture({
      commandId: row.commandId,
      callback: (err, blob) => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: " La génération du pdf à échoué merci de contacter l'administrateur",
            },
          });
        } else {
          const pdfBlob = new Blob([blob], { type: blob.type });
          saveAs(
            pdfBlob,
            `facture-${row.isAggregate ? row.laboratoryName : row.pharmacyName}/${moment(
              row.deliveredAt ? row.deliveredAt : row.creationDate,
            ).format('DD/MM/YYYY')}-FAC${row.commandId}`,
          );
        }
      },
    });
    this.setState({ isTippyOpen: false });
  };

  printBL = row => () => {
    const { getDownloadBL } = this.props;
    getDownloadBL({
      commandId: row.commandId,
      callback: (err, blob) => {
        if (err) {
          this.setState({
            showInfoBar: true,
            infoBarParams: {
              title: " La génération du pdf à échoué merci de contacter l'administrateur",
            },
          });
        } else {
          const pdfBlob = new Blob([blob], { type: blob.type });
          saveAs(
            pdfBlob,
            `BL-${row.isAggregate ? row.laboratoryName : row.pharmacyName}/${moment(
              row.deliveredAt ? row.deliveredAt : row.creationDate,
            ).format('DD/MM/YYYY')}-BL${row.commandId}`,
          );
        }
      },
    });
    this.setState({ isTippyOpen: false });
  };

  closeCommandDetail = () => {
    const { clearCommandArticles } = this.props;
    clearCommandArticles();
    this.setState({
      update: false,
      showCommandDetail: false,
      selectedCommand: null,
    });
  };

  changeColumnSort = index => () => {
    let { cols } = this.state;
    const { [index]: col } = cols;
    cols = cols.map((a, i) => ({
      ...a,
      selected: false,
      order: i === index ? a.order : 'asc',
    }));
    this.setState(
      {
        ...this.state,
        cols: _.merge([], cols, {
          [index]: {
            order: col.order === 'desc' ? 'asc' : 'desc',
            selected: true,
          },
        }),
      },
      this.onSearch,
    );
  };

  onRowChange = payload => {
    const { changeCommandArticle } = this.props;
    changeCommandArticle(payload);
  };

  onUpdate = () => {
    const {
      selectedCommand: { commandId },
    } = this.state;
    const { updateCommandDetail, commandArticles } = this.props;

    updateCommandDetail({
      commandId,
      commandArticles,
      isAggregate: this.forAdminCommands,
      callback: this.onUpdateSuccess,
    });
  };

  onUpdateSuccess = () => {
    this.onSearch();
    this.closeCommandDetail();
    this.setState({
      showInfoBar: true,
      infoBarParams: {
        title: 'La commande a étè bien mis à jour',
      },
    });
  };

  showSubCommandsModel = row => () => {
    const { commandId } = row;
    const { loadAggregateSubCommands } = this.props;
    loadAggregateSubCommands(commandId, err => {
      if (err) {
        this.setState({
          showInfoBar: true,
          infoBarParams: {
            title: " La list des sous commmande  à échoué merci de contacter l'administrateur",
          },
        });
      }
    });
    this.setState({
      showSubCommands: true,
      selectedCommand: row,
    });
  };

  closeSubCommandsModel = () => {
    const { clearAggregateSubCommands } = this.props;
    clearAggregateSubCommands();
    this.setState({
      showSubCommands: false,
      selectedCommand: null,
    });
  };

  get isAdmin() {
    const {
      user: { role },
    } = this.props;

    return role === SUPER_ADMIN;
  }

  get isMember() {
    const {
      user: { role },
    } = this.props;
    return role === MEMBRE;
  }

  get isCommandsPage() {
    if (history.location.pathname === '/commands') {
      return true;
    }
    return false;
  }

  get forAdminCommands() {
    const {
      user: { role },
      match: {
        params: { offerId },
      },
    } = this.props;
    return !offerId && role === SUPER_ADMIN;
  }

  get canGroup() {
    const {
      user: { role },
      match: {
        params: { offerId },
      },
    } = this.props;
    return !!offerId && role === SUPER_ADMIN;
  }

  get disableGroupingBtn() {
    const { selectedOffer } = this.props;
    const endDate = _.get(selectedOffer, 'dateFin');
    const startDate = _.get(selectedOffer, 'dateDebut');
    return (
      moment(new Date()).isBetween(new Date(startDate), new Date(endDate)) || moment(new Date()).isBefore(new Date(startDate))
    );
  }

  goToGrouping = () => {
    const {
      match: {
        params: { offerId },
      },
    } = this.props;
    history.push(`/grouping/${offerId}`);
  };

  dispatchQuantity = ({ commandId, offerId }) => () => {
    const { dispatchQuantity } = this.props;
    dispatchQuantity({
      commandId,
      callback: this.onDispatchSuccess(offerId),
    });
  };

  onDispatchSuccess = offerId => error => {
    this.closePopConfirmation();
    // this.setState({
    //   showInfoBar: true,
    //   infoBarParams: error
    //     ? { title: 'Merci remplir toutes les quantités livrées !' }
    //     : {
    //         title: 'votre commnde est enregistrée comme livrée',
    //         onSuccessTitle: 'Consulter',
    //         onSuccess: () => history.push(`offres/${offerId}/commands`),
    //       },
    // });
    // this.forceUpdate();

    // history.go(0);
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  componentWillMount() {
    this.onSearch();
    this.loadOfferMetaData();
  }

  loadOfferMetaData() {
    const {
      match: {
        params: { offerId, callback },
      },
      loadOfferMetaData,
      user: { role },
    } = this.props;
    !!offerId &&
      (role === SUPER_ADMIN || role === ADMIN) &&
      loadOfferMetaData({
        offerId,
        callback: err => {
          if (err) {
            this.setState({
              showInfoBar: true,
              infoBarParams: {
                title: "le chargement des commands a échoué merci de contacter l'administrateur ",
              },
            });
          }
        },
      });
  }

  componentWillUnmount() {
    const { clearSelectedOffer } = this.props;
    clearSelectedOffer();
  }

  openPopConfirmation = ({ title, textContent, onClose, onSubmit }) => {
    this.setState({
      showPopConfirmation: true,
      popConfirmationParams: {
        title,
        textContent,
        onClose,
        onSubmit,
      },
    });
  };

  closePopConfirmation = () => {
    this.setState({
      showPopConfirmation: false,
      popConfirmationParams: {},
    });
  };

  render() {
    const {
      classes,
      commandPageable: { totalElements, size, number, content: commands = [] },
      commandArticles,
      user,
      subCommands,
      selectedOffer,
      copyQtIntoModifiedQt,
      width,
    } = this.props;
    const { selectedCommand, showInfoBar, infoBarParams, showPopConfirmation, popConfirmationParams, cols } = this.state;
    const isSmallDevice = isWidthDown('md', width);

    return (
      <>
        <Typography component="h1" variant="h4" className={classes.root}>
          {this.forAdminCommands && 'Liste de mes commandes groupées'}
          {this.canGroup && "List des commandss associées à l'offre : "}
          {!this.forAdminCommands && !this.canGroup && 'Liste des commandes'}
        </Typography>
        {this.canGroup && (
          <div className={classes.root}>
            <OfferMetaData offer={selectedOffer} />
          </div>
        )}

        {/* <Divider variant="middle" className={classes.root} /> */}
        <Search fields={this.searchFields} onSearch={this.onSearch} />

        {this.canGroup && (
          <div className={`${classes.root} ${classes.groupingContainer}`}>
            {this.disableGroupingBtn && (
              <span className={classes.groupingMsg}>* Vous ne pouvez pas grouper jusqu'à ce que l'offre soit clôturé</span>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={this.disableGroupingBtn}
              onClick={this.goToGrouping}
            >
              Creer un grouping
            </Button>
          </div>
        )}
        <div style={{ height: '8px' }} />

        {isSmallDevice ? (
          <div className={classes.root}>
            {!!commands.length && (
              <CommandListCards
                commandsList={commands}
                totalElements={totalElements}
                rowsPerPage={size}
                page={number}
                handleChangePage={this.onPageChange}
                handleChangeRowsPerPage={this.onPageSizeChange}
                printCommand={this.printCommand}
                deleteCommand={this.performDeleteCommand}
                updateCommand={this.updateCommandDetail}
                onRowChange={this.onRowChange}
                isAdmin={this.isAdmin}
                canDelete={!this.canGroup}
                disableClientEditCommand={this.disableGroupingBtn}
                clearCommandArticles={this.props.clearCommandArticles}
              />
            )}
            <GeneriqueDialog open={showPopConfirmation} {...popConfirmationParams} />
          </div>
        ) : (
          <Paper className={classes.root}>
            <Table
              headers={commandHeadersWithOption(
                cols.map(({ colName, label, order }, index) => (
                  <Tooltip key={colName} title="Sort" placement="bottom-start" enterDelay={300}>
                    <TableSortLabel style={{ color: '#fff' }} active direction={order} onClick={this.changeColumnSort(index)}>
                      {label}
                    </TableSortLabel>
                  </Tooltip>
                )),
              )}
              onChangePage={this.onPageChange}
              totalElements={totalElements}
              pageSize={size}
              pageNumber={number}
              emptyMsg="Aucune Commande soumise"
              onChangeRowPerPage={this.onPageSizeChange}
            >
              {!!commands.length && (
                <CommandBody
                  list={commands}
                  user={user}
                  forAdmin={this.forAdminCommands}
                  isAdmin={this.isAdmin}
                  dispatchQuantity={this.performDispatching}
                  updateCommand={this.updateCommandDetail}
                  selectCommand={this.showCommandDetail}
                  deleteCommand={this.performDeleteCommand}
                  printCommand={this.printCommand}
                  canDelete={!this.canGroup}
                  disableClientEditCommand={this.disableGroupingBtn}
                  showSubCommands={this.showSubCommandsModel}
                  blob={this.state.blobUrl}
                  isMember={this.isMember}
                  canGroup={this.canGroup}
                  printFacture={this.printFacture}
                  printBL={this.printBL}
                  handleTippyToggle={this.handleTippyToggle}
                  isTippyOpen={this.state.isTippyOpen}
                />
              )}
            </Table>
            <GeneriqueDialog open={showPopConfirmation} {...popConfirmationParams} />
            <Dialog
              title={!this.state.update ? 'Détail de la commande' : 'Modifier la commande'}
              open={this.state.showCommandDetail}
              showBtns={this.state.update}
              cancelTitle="Annuler"
              submitTitle="Mettre à jour"
              onClose={this.closeCommandDetail}
              onSubmit={this.onUpdate}
            >
              <CommandFullDetail
                onChange={this.onRowChange}
                readMode={!this.state.update}
                isAdmin={this.isAdmin}
                copyQuantities={copyQtIntoModifiedQt}
                forAdmin={this.forAdminCommands}
                metadata={selectedCommand}
                list={commandArticles}
              />
            </Dialog>
            <Dialog
              title="List des commands associées"
              open={this.state.showSubCommands}
              showBtns={false}
              onClose={this.closeSubCommandsModel}
            >
              <Table headers={commandHeaders} pageable={false}>
                {!!subCommands.length && <CommandBody withOptions={false} list={subCommands} />}
              </Table>
            </Dialog>
            <InfoBar open={showInfoBar} onClose={this.closeInfoBar} {...infoBarParams} />
          </Paper>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(_.merge({}, actionCreators, { clearSelectedOffer }), dispatch);

// const styles = styles => ({
//   backgourndColor: 'green',
// });

const mapStateToProps = createStructuredSelector({
  commandPageable: getCommandsList(),
  commandArticles: getCommandArticles(),
  user: makeSelectUser(),
  subCommands: getSubCommands(),
  selectedOffer: selectSelectedOffer(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
  withWidth(),
)(Command);
