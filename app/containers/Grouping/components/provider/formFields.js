import validators from '../../../../core/validation';

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
    fields.fullName,
    formData.fullName,
  );
  validationResult = validate(validationResult, fields.email, formData.email);
  validationResult = validate(validationResult, fields.phone, formData.phone);
  validationResult = validate(validationResult, fields.fax, formData.fax);
  validationResult = validate(validationResult, fields.city, formData.city);

  return validationResult;
};

export const fields = {
  fullName: {
    name: 'fullName',
    label: 'Nom Complete',
    validator: validators.stringNotBlank,
  },
  email: {
    name: 'email',
    label: 'Email',
    validator: validators.emailValidation,
  },
  phone: {
    name: 'phone',
    label: 'Téléphone',
    validator: validators.phoneValidation,
  },
  fax: {
    name: 'fax',
    label: 'Fax',
    validator: validators.phoneValidation,
  },
  city: {
    name: 'city',
    label: 'Ville',
    validator: validators.selectNotBlank,
  },
};
