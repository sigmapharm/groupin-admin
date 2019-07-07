import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider/Divider';
import Paper from '@material-ui/core/Paper/Paper';
import Button from '@material-ui/core/Button/Button';
import history from 'utils/history';
import authenticated from '../HOC/authenticated/authenticated';
import styles from './style';
import Search from './components/search/index';
import searchFields from './searchFields';
import { commandHeaders, commandHeadersWithOption } from './headers';
import Table from '../../components/Table/index';
import CommandBody from './components/commands/metadata/index';
import {
  getCommandArticles,
  getCommandsList,
  getSubCommands,
} from './store/selectors';
import * as actionCreators from './store/actions.creators';
import Dialog from '../../components/Dialog/index';
import CommandFullDetail from './components/commands/details';
import InfoBar from '../../components/Snackbar/InfoBar';
import { makeSelectUser } from '../App/selectors';
import { SUPER_ADMIN } from '../AppHeader/Roles';

class Command extends PureComponent {
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
    const { searchData } = this.state;
    const {
      match: {
        params: { offerId },
      },
      commandPageable: { number, size },
      loadCommands,
    } = this.props;
    loadCommands({
      ...searchData,
      offerId,
      size,
      page: number,
      isAggregate: this.forAdminCommands,
    });
  };

  onDeleteSuccess = () => {
    this.setState({
      showInfoBar: true,
      infoBarParams: {
        title: 'La commands a étè bien supprimé ',
      },
    });
    this.onSearch();
  };

  onPageChange = (event, page) => {
    const { searchData } = this.state;
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
    });
  };

  onPageSizeChange = ({ target: { value } }) => {
    const { searchData } = this.state;
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
    });
  };

  deleteCommand = ({ commandId, canDelete }) => () => {
    const { deleteCommand } = this.props;
    if (canDelete)
      deleteCommand({
        commandId,
        callback: this.onDeleteSuccess,
        isAggregate: this.forAdminCommands,
      });
  };

  showCommandDetail = row => () => {
    const { loadCommandArticles } = this.props;
    loadCommandArticles({
      commandId: row.commandId,
      isAggregate: this.forAdminCommands,
    });

    this.setState({
      update: false,
      showCommandDetail: true,
      selectedCommand: row,
    });
  };

  updateCommandDetail = row => () => {
    const { loadCommandArticles } = this.props;
    loadCommandArticles({
      commandId: row.commandId,
      isAggregate: this.forAdminCommands,
    });

    this.setState({
      update: true,
      showCommandDetail: true,
      selectedCommand: row,
    });
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
    };
  }

  showSubCommandsModel = row => () => {
    const { commandId } = row;
    const { loadAggregateSubCommands } = this.props;
    loadAggregateSubCommands(commandId);
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

  onDispatchSuccess = offerId => () => {
    this.setState({
      showInfoBar: true,
      infoBarParams: {
        title: 'Les quantités sont bien dispatchées',
        onSuccessTitle: 'Consulter',
        onSuccess: () => history.push(`offres/${offerId}/commands`),
      },
    });
  };

  closeInfoBar = () => this.setState({ showInfoBar: false, infoBarParams: {} });

  componentWillMount() {
    this.onSearch();
  }

  render() {
    const {
      classes,
      commandPageable: { totalElements, size, number, content: commands = [] },
      commandArticles,
      user,
      subCommands,
    } = this.props;
    const { selectedCommand, showInfoBar, infoBarParams } = this.state;

    return (
      <>
        <Typography component="h1" variant="h4" className={classes.root}>
          Liste des commands
        </Typography>
        <Divider variant="middle" className={classes.root} />
        <Search fields={this.searchFields} onSearch={this.onSearch} />

        {this.canGroup && (
          <div className={`${classes.root} ${classes.groupingContainer}`}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.goToGrouping}
            >
              Creer un grouping
            </Button>
          </div>
        )}

        <Paper className={classes.root}>
          <Table
            headers={commandHeadersWithOption}
            onChangePage={this.onPageChange}
            totalElements={totalElements}
            pageSize={size}
            pageNumber={number}
            onChangeRowPerPage={this.onPageSizeChange}
          >
            {!!commands.length && (
              <CommandBody
                list={commands}
                user={user}
                forAdmin={this.forAdminCommands}
                dispatchQuantity={this.dispatchQuantity}
                updateCommand={this.updateCommandDetail}
                selectCommand={this.showCommandDetail}
                deleteCommand={this.deleteCommand}
                canDelete={!this.canGroup}
                showSubCommands={this.showSubCommandsModel}
              />
            )}
          </Table>
          <Dialog
            title={
              !this.state.update
                ? 'Detail de la command'
                : 'Modifier la command'
            }
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
              {!!subCommands.length && (
                <CommandBody withOptions={false} list={subCommands} />
              )}
            </Table>
          </Dialog>
          <InfoBar
            open={showInfoBar}
            onClose={this.closeInfoBar}
            {...infoBarParams}
          />
        </Paper>
      </>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

const mapStateToProps = createStructuredSelector({
  commandPageable: getCommandsList(),
  commandArticles: getCommandArticles(),
  user: makeSelectUser(),
  subCommands: getSubCommands(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(Command);
