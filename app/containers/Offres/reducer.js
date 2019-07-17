import { fromJS } from 'immutable';
import moment from 'moment';
import _ from 'lodash';
import {
  APPLY_GLOBAL_REMISE_OR_MIN_QT,
  CHANGE_ARTICLE_OFFER,
  CHANGE_OFFER_ARTICLE,
  CHANGE_OFFER_FORM_DATA,
  CLEAR_OFFER,
  CLEAR_SELECTED_OFFER,
  GET_OFFER_WITH_DETAILS_SUCCESS,
  GET_OFFRES_LIST_ACTION,
  LOAD_ARTICLES_OFFER_SUCCESS,
  MANAGE_CREATE_OFFRE_RESPONSE,
  PUT_OFFRES_LIST_ACTION,
  SELECT_OFFER,
  TOGGLE_CHECK_ALL,
} from './constants';
import {
  GET_LABO_ARTICLES_LIST_ACTION,
  PUT_ARTICLESLABO_LIST_ACTION,
} from '../App/constants';
import { LOAD_OFFER_META_DATA_SUCCESS } from '../Command/store/actions';

export const formDataInitialState = fromJS({
  designation: '',
  dateDebut: '',
  dateFin: '',
  montant: '',
  quantiteMin: '',
  status: '',
  montantMax: '',
  laboratoire: '',
  comment: '',
});

export const initialState = fromJS({
  offresList: [],
  offerArticles: [],
  page: 0,
  rowsPerPage: 10,
  laboratoire: {},
  articlesListlabo: [],
  originalOfferFormData: {},
  offerFormData: {
    designation: '',
    dateDebut: '',
    dateFin: '',
    montant: '',
    quantiteMin: '',
    status: '',
    montantMax: '',
    laboratoire: '',
    comment: '',
  },
  selectedOffer: {},
  selectedAll: false,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case APPLY_GLOBAL_REMISE_OR_MIN_QT: {
      const articlesListlabo = state.get('articlesListlabo').toJS();
      const payload = action.payload;
      return state.merge({
        articlesListlabo: articlesListlabo.map(({ selected, ...article }) => ({
          ...article,
          selected,
          ...(selected ? payload : {}),
        })),
      });
    }
    case TOGGLE_CHECK_ALL: {
      const articlesListlabo = state.get('articlesListlabo').toJS();
      const selectedAll = state.get('selectedAll');
      return state.merge({
        selectedAll: !selectedAll,
        articlesListlabo: articlesListlabo.map(e => ({
          ...e,
          selected: !selectedAll,
        })),
      });
    }
    case LOAD_OFFER_META_DATA_SUCCESS: {
      return state.merge({
        selectedOffer: action.payload,
      });
    }
    case CLEAR_SELECTED_OFFER: {
      return state.merge({
        selectedOffer: {},
      });
    }
    case GET_OFFRES_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_OFFRES_LIST_ACTION: {
      return state.merge({
        offresList: action.payload,
      });
    }
    case CHANGE_OFFER_ARTICLE: {
      const { id, ...payload } = action.payload;
      const offerArticles = state.get('offerArticles').toJS();
      const articleIndex = _.findIndex(offerArticles, { id });
      return state.merge({
        offerArticles: _.merge(offerArticles, { [articleIndex]: payload }),
      });
    }
    case LOAD_ARTICLES_OFFER_SUCCESS: {
      return state.merge({
        offerArticles: action.payload,
      });
    }
    case CLEAR_OFFER: {
      return state.merge({
        offerFormData: formDataInitialState.toJS(),
        originalOfferFormData: {},
        offerArticles: [],
        articlesListlabo: [],
      });
    }
    case GET_LABO_ARTICLES_LIST_ACTION: {
      return state.merge({
        laboratoire: action.payload,
      });
    }
    case PUT_ARTICLESLABO_LIST_ACTION: {
      return state.merge({
        selectedAll:false,
        articlesListlabo: action.payload || [],
      });
    }
    case MANAGE_CREATE_OFFRE_RESPONSE: {
      const { errors } = action.payload;
      return _.isEmpty(errors)
        ? state.merge({
          articlesListlabo: [],
          offerFormData: formDataInitialState.toJS(),
        })
        : state;
    }
    case CHANGE_OFFER_FORM_DATA: {
      const offerFormData = state.get('offerFormData').toJS();
      return state.merge({
        offerFormData: _.merge(offerFormData, action.payload),
      });
    }
    case GET_OFFER_WITH_DETAILS_SUCCESS: {
      const { dateDebut, dateFin } = action.payload;
      return state.merge({
        selectedAll:true,
        articlesListlabo: action.payload.articleDtos,
        offerFormData: _.merge(_.omit(action.payload, 'articleDtos'), {
          dateDebut: moment(dateDebut).format('YYYY-MM-DD'),
          dateFin: moment(dateFin).format('YYYY-MM-DD'),
        }),
        originalOfferFormData: _.merge(_.omit(action.payload, 'articleDtos'), {
          dateDebut: moment(dateDebut).format('YYYY-MM-DD'),
          dateFin: moment(dateFin).format('YYYY-MM-DD'),
        }),
      });
    }
    case CHANGE_ARTICLE_OFFER: {
      const { index, selected, discount, minQuantity } = action.payload;
      const articlesListlabo = state.get('articlesListlabo').toJS();
      const item = articlesListlabo[index];
      return state.merge({
        articlesListlabo: _.merge(articlesListlabo, {
          [index]: {
            selected,
            discount: selected ? discount : 0,
            minQuantity: selected ? minQuantity : 0,
            computedPPH: selected ? item.pph * (1 - (discount || 0) / 100) : 0,
          },
        }),
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
