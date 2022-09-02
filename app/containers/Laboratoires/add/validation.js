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
  validationResult = validate(validationResult, fields.nom, formData.nom);
  validationResult = validate(validationResult, fields.email, formData.email);
  validationResult = validate(validationResult, fields.website, formData.website);
  validationResult = validate(validationResult, fields.description, formData.description);
  validationResult = validate(validationResult, fields.adresse, formData.adresse);

  return validationResult;
};

export const fields = {
  nom: {
    name: 'nom',
    label: 'nom',
    validator: validators.stringNotBlank,
  },
  email: {
    name: 'email',
    label: 'email',
    validator: validators.emailValidation,
  },
  website: {
    name: 'website',
    label: 'website',
    validator: validators.stringNotBlank,
  },
  description: {
    name: 'description',
    label: 'description',
    validator: validators.stringNotBlank,
  },
  adresse: {
    name: 'adresse',
    label: 'adresse',
    validator: validators.stringNotBlank,
  },
};
