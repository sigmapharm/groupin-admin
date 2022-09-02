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
  validationResult = validate(validationResult, fields.denomination, formData.denomination);
  validationResult = validate(validationResult, fields.adresse, formData.adresse);
  validationResult = validate(validationResult, fields.banque, formData.banque);
  validationResult = validate(validationResult, fields.numRC, formData.numRC);
  validationResult = validate(validationResult, fields.formeJuridique, formData.formeJuridique);
  validationResult = validate(validationResult, fields.patente, formData.patente);
  validationResult = validate(validationResult, fields.fonction, formData.fonction);

  return validationResult;
};

export const fields = {
  denomination: {
    name: 'denomination',
    label: 'denomination',
    validator: validators.stringNotBlank,
  },
  adresse: {
    name: 'adresse',
    label: 'adresse',
    validator: validators.stringNotBlank,
  },
  banque: {
    name: 'banque',
    label: 'banque',
    validator: validators.stringNotBlank,
  },
  ice: {
    name: 'ice',
    label: 'ice',
    validator: validators.stringNotBlank,
  },
  formeJuridique: {
    name: 'formeJuridique',
    label: 'formeJuridique',
    validator: validators.stringNotBlank,
  },
  patente: {
    name: 'patente',
    label: 'patente',
    validator: validators.stringNotBlank,
  },
  tel: {
    name: 'tel',
    label: 'tel',
    validator: validators.stringNotBlank,
  },
  gsm: {
    name: 'gsm',
    label: 'gsm',
    validator: validators.stringNotBlank,
  },
  numRC: {
    name: 'numRC',
    label: 'numRC',
    validator: validators.stringNotBlank,
  },
  dateDemarrage: {
    name: 'dateDemarrage',
    label: 'dateDemarrage',
    validator: validators.stringNotBlank,
  },
  dateCreation: {
    name: 'dateCreation',
    label: 'dateCreation',
    validator: validators.stringNotBlank,
  },
  interlocuteur: {
    name: 'interlocuteur',
    label: 'interlocuteur',
    validator: validators.stringNotBlank,
  },
  fonction: {
    name: 'fonction',
    label: 'fonction',
    validator: validators.stringNotBlank,
  },
};
