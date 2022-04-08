import _ from 'lodash';
import validators from '../../../core/validation';

const validate = (result, field, value) => {
  const validation = field.validator(value);
  if (validation) {
    return {
      fields: {
        ...result.fields,
        [field.name]: true,
      },
      messages: {
        ...result.messages,
        [field.label]: validation,
      },
    };
  }
  return { ...result };
};
export const validateArticleList = (result, offerArticles) => {
  const validation = _.some(offerArticles, ({ selected, minQuantity }) => selected && (minQuantity || 0) <= 0);
  if (validation) {
    return {
      fields: {
        ...result.fields,
        'Quantité Minimal': true,
      },
      messages: {
        ...result.messages,
        'Quantité minimal ': 'Vous devez remplir toutes les quantités minimales',
      },
    };
  }
  return { ...result };
};
export const validateFormData = formData => {
  let validationResult = {};
  validationResult = validate(validationResult, fields.designation, formData.designation);
  // validationResult = validate(
  //   validationResult,
  //   fields.dateDebut,
  //   formData.dateDebut,
  // );
  validationResult = validate(validationResult, fields.dateFin, formData.dateFin);
  fields.dateFin.validator = validators.isBeforeValidation(formData.dateDebut);
  validationResult = validate(validationResult, fields.dateFin, formData.dateFin);
  validationResult = validate(validationResult, fields.montant, formData.montant);
  validationResult = validate(validationResult, fields.globalDiscount, formData.globalDiscount);

  return validationResult;
};

export const fields = {
  designation: {
    name: 'designation',
    label: 'Designation',
    validator: validators.stringNotBlank,
  },
  dateDebut: {
    name: 'dateDebut',
    label: 'Date début',
    type: 'date',
    validator: validators.stringNotBlank,
  },
  dateFin: {
    name: 'dateFin',
    type: 'date',
    label: 'Date fin',
    specialProps: {
      InputLabelProps: {
        shrink: true,
      },
      style: {
        width: '100%',
      },
      label: 'Date fin',
    },
    validator: validators.stringNotBlank,
  },
  montant: {
    name: 'montant',
    label: 'Montant par objectif',
    type: 'number',
    validator: validators.stringNotBlank,
  },
  quantiteMin: {
    name: 'quantiteMin',
    label: 'Qté min',
    type: 'number',
    validator: validators.stringNotBlank,
  },
  montantMax: {
    name: 'montantMax',
    label: 'Montant max',
    type: 'number',
    validator: validators.stringNotBlank,
  },
  discount: {
    name: 'discount',
    label: 'Remise',
    type: 'number',
  },
  globalDiscount: {
    name: 'globalDiscount',
    label: 'Escompte % ',
    type: 'number',
    validator: validators.stringNotBlank,
  },
  offerComment: {
    name: 'comment',
    label: 'Comment',
    type: 'text',
  },
  minToOrder: {
    name: 'minToOrder',
    label: 'min To Order',
    type: 'number',
  },
};
