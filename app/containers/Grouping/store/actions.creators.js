import * as actionsType from './actions';

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
