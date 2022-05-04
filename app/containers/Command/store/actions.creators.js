import * as actionsType from './actions';

export const loadCommands = payload => ({
  type: actionsType.LOAD_COMMANDS_WITH_FILTERS,
  payload,
});

export const loadCommandsSuccess = payload => ({
  type: actionsType.LOAD_COMMANDS_WITH_FILTERS_SUCCESS,
  payload,
});

export const deleteCommand = ({ commandId, callback, isAggregate }) => ({
  type: actionsType.DELETE_COMMAND,
  payload: { id: commandId, callback, isAggregate },
});

export const deleteCommandSuccess = payload => ({
  type: actionsType.DELETE_COMMAND_SUCCESS,
  payload,
});

export const loadCommandArticles = ({ commandId, isAggregate, callback }) => ({
  type: actionsType.LOAD_COMMAND_ARTICLES,
  payload: { id: commandId, isAggregate, callback },
});

export const clearCommandArticles = () => ({
  type: actionsType.CLEAR_COMMAND_ARTICLES,
});
export const changeCommandArticle = payload => ({
  type: actionsType.CHANGE_COMMAND_ARTICLE,
  payload,
});

export const loadCommandArticlesSuccess = payload => ({
  type: actionsType.LOAD_COMMAND_ARTICLES_SUCCESS,
  payload,
});

export const updateCommandDetail = payload => ({
  type: actionsType.UPDATE_COMMAND_DETAIL,
  payload,
});

export const updateCommandDetailSuccess = payload => ({
  type: actionsType.UPDATE_COMMAND_DETAIL_SUCCESS,
  payload,
});

export const loadAggregateSubCommands = (id, callback) => ({
  type: actionsType.LOAD_AGGREGATE_SUB_COMMANDS,
  payload: { id, callback },
});

export const clearAggregateSubCommands = () => ({
  type: actionsType.CLEAR_AGGREGATE_SUB_COMMANDS,
});

export const loadAggregateSubCommandsSuccess = payload => ({
  type: actionsType.LOAD_AGGREGATE_SUB_COMMANDS_SUCCESS,
  payload,
});

export const dispatchQuantity = ({ commandId, callback }) => ({
  type: actionsType.DISPATCH_QUANTITY_TO_SUB_COMMANDS,
  payload: { id: commandId, callback },
});

export const dispatchQuantitySuccess = () => ({
  type: actionsType.DISPATCH_QUANTITY_TO_SUB_COMMANDS_SUCCESS,
});

export const loadOfferMetaData = ({ offerId, callback }) => ({
  type: actionsType.LOAD_OFFER_META_DATA,
  payload: { offerId, callback },
});
export const loadOfferMetaDataSuccess = payload => ({
  type: actionsType.LOAD_OFFER_META_DATA_SUCCESS,
  payload,
});
export const loadOfferMetaDataFail = () => ({
  type: actionsType.LOAD_OFFER_META_DATA_FAIL,
});

export const copyQtIntoModifiedQt = () => ({
  type: actionsType.COPY_QUANTITIES_INTO_MODIFIED_QUANTITES,
});

export const downloadCommandForm = ({ commandId, callback }) => ({
  type: actionsType.DOWNLOAD_COMMAND_FORM,
  payload: { commandId, callback },
});

export const getDownloadFacture = ({ commandId, callback }) => ({
  type: actionsType.GET_DOWNLOAD_FACTURE_FORM,
  payload: { commandId, callback },
});

export const putDownloadFacture = payload => ({
  type: actionsType.PUT_DOWNLOAD_FACTURE_FORM,
  payload,
});
