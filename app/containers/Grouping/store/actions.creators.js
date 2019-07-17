import * as actionsType from './actions';
import { CREATE_NEW_PROVIDER } from './actions';

export const loadAllCommandByOffer = offerId => ({
  type: actionsType.LOAD_ALL_COMMAND_BY_OFFER,
  payload: { id: offerId },
});
export const loadAllCommandByOfferSuccess = ({ content }) => ({
  type: actionsType.LOAD_ALL_COMMAND_BY_OFFER_SUCCESS,
  payload: content,
});

export const changeCommandSelection = ({ index, selected }) => ({
  type: actionsType.CHANGE_COMMAND_SELECTION,
  payload: { index, selected },
});

export const loadAggregatedArticles = commandIds => ({
  type: actionsType.LOAD_AGGREGATED_ARTICLES,
  payload: { commandIds },
});

export const loadAggregatedArticlesSuccess = payload => ({
  type: actionsType.LOAD_AGGREGATED_ARTICLES_SUCCESS,
  payload,
});

export const createCommandAggregate = (
  { providerId, offerId, commandsId, commandArticleAggregates },
  callback,
) => ({
  type: actionsType.CREATE_COMMAND_AGGREGATE,
  payload: { providerId, offerId, commandsId, commandArticleAggregates },
  callback,
});
export const createCommandAggregateSuccess = payload => ({
  type: actionsType.CREATE_COMMAND_AGGREGATE_SUCCESS,
  payload,
});

export const changeAggregatedArticleQuantity = ({
  index,
  modifiedQuantity,
}) => ({
  type: actionsType.CHANGE_AGGREGATED_ARTICLE_QUANTITY,
  payload: { index, modifiedQuantity },
});

export const clearGroupingResources = () => ({
  type: actionsType.CLEAR_GROUPING,
});

export const createNewProvider = (formData, callback) => ({
  type: actionsType.CREATE_NEW_PROVIDER,
  payload: formData,
  callback,
});

export const createNewProviderSuccess = () => ({
  type: actionsType.CREATE_NEW_PROVIDER_SUCCESS,
});

export const createNewProviderFail = () => ({
  type: actionsType.CREATE_NEW_PROVIDER_SUCCESS,
});

export const loadAllProviders = () => ({
  type: actionsType.GET_ALL_PROVIDERS,
});

export const loadAllProvidersSuccess = payload => ({
  type: actionsType.GET_ALL_PROVIDERS_SUCCESS,
  payload,
});

export const toggleCheckAll = payload => ({
  type: actionsType.TOGGLE_CHECK_ALL,
});
