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
  return {...result};
};

export const validateFormData = formData => {
  let validationResult = {};
  validationResult = validate(
    validationResult,
    fields.designation,
    formData.designation,
  );
  validationResult = validate(
    validationResult,
    fields.dateDebut,
    formData.dateDebut,
  );
  validationResult = validate(
    validationResult,
    fields.dateFin,
    formData.dateFin,
  );
  validationResult = validate(
    validationResult,
    fields.montant,
    formData.montant,
  );
  validationResult = validate(
    validationResult,
    fields.quantiteMin,
    formData.quantiteMin,
  );

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
    label: 'Quantité minimale',
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
  offerComment: {
    name: 'comment',
    label: 'Comment',
    type: 'text',
  },
};
