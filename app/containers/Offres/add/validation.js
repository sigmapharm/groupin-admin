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
  validationResult = validate(validationResult, fields.status, formData.status);

  return validationResult;
};

export const fields = {
  designation: {
    name: 'designation',
    label: 'designation',
    validator: validators.stringNotBlank,
  },
  dateDebut: {
    name: 'dateDebut',
    label: 'Date Début',
    type: 'date',
    validator: validators.stringNotBlank,
  },
  dateFin: {
    name: 'dateFin',
    type: 'date',
    label: 'Date Fin',
    specialProps: {
      InputLabelProps: {
        shrink: true,
      },
      style: {
        width: '100%',
      },
      label: 'Date Fin',
    },
    validator: validators.stringNotBlank,
  },
  montant: {
    name: 'montant',
    label: 'Montant objectif',
    type: 'number',
    validator: validators.stringNotBlank,
  },
  quantiteMin: {
    name: 'quantiteMin',
    label: 'quantité Minimale',
    type: 'number',
    validator: validators.stringNotBlank,
  },
  status: {
    name: 'status',
    label: "status de l'offre",
    validator: validators.stringNotBlank,
  },
  montantMax: {
    name: 'montantMax',
    label: 'Montant Max',
    validator: validators.stringNotBlank,
  },
};
