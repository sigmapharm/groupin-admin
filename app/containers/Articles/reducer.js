import { fromJS } from 'immutable';
import {
  CHANGE_ARTICLE_FORM_DATA,
  CLEAR_ARTICLE_FORM,
  GET_ARTICLE_DETAILS_SUCCESS,
  GET_ARTICLES_LIST_ACTION,
  GET_ARTICLESLABO_LIST_ACTION,
  MANAGE_CREATE_ARTICLE_RESPONSE,
  PUT_ARTICLES_LIST_ACTION,
  SUBMIT_DELETE_ARTICLE,
} from './constants';
import { CHANGE_OFFER_FORM_DATA } from '../Offres/constants';
import { formatLaboratoireToLabelValue } from './add/utils';

const articleFormDataInitialState = fromJS({
  reference: '',
  nom: '',
  gamme: '',
  codebare: '',
  categorie: '',
  classe_therapeutique: '',
  dci: '',
  pph: '',
  tva: '',
  neccissite_prescription: '',
  produit_Marche: '',
  forme_galenique: '',
});

export const initialState = fromJS({
  articleFormData: articleFormDataInitialState.toJS(),
  articlesList: [],
  articlesListlabo: [],
  laboratoire: '',
  page: 0,
  rowsPerPage: 10,
});

function reducer(state = initialState, action) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case GET_ARTICLES_LIST_ACTION: {
      return state.merge({
        rowsPerPage: action.payload.rowsPerPage,
        page: action.payload.page,
      });
    }
    case PUT_ARTICLES_LIST_ACTION: {
      return state.merge({
        articlesList: action.payload,
      });
    }
    case GET_ARTICLESLABO_LIST_ACTION: {
      return state.merge({
        laboratoire: action.payload,
      });
    }
    case SUBMIT_DELETE_ARTICLE: {
      return state.filter(row => row.id !== action.id);
    }
    case CHANGE_ARTICLE_FORM_DATA: {
      const articleFormData = state.get('articleFormData').toJS();
      return state.merge({
        articleFormData: _.merge(articleFormData, action.payload),
      });
    }
    case GET_ARTICLE_DETAILS_SUCCESS: {
      const formData = action.payload;
      formData.laboratoire = formatLaboratoireToLabelValue(
        formData.laboratoire,
      );
      return state.merge({
        articleFormData: formData,
      });
    }
    case MANAGE_CREATE_ARTICLE_RESPONSE:
    case CLEAR_ARTICLE_FORM: {
      return state.merge({
        articleFormData: articleFormDataInitialState.toJS(),
      });
    }

    default: {
      return state;
    }
  }
}

export default reducer;
