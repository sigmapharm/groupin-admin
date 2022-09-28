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
  validationResult = validate(validationResult, fields.fullName, formData.fullName);
  validationResult = validate(validationResult, fields.phone, formData.phone);
  validationResult = validate(validationResult, fields.fax, formData.fax);
  validationResult = validate(validationResult, fields.email, formData.email);
  validationResult = validate(validationResult, fields.cityName, formData.cityName);

  return validationResult;
};

export const fields = {
  fullName: {
    name: 'fullName',
    label: 'FullName',
    validator: validators.stringNotBlank,
  },
  phone: {
    name: 'phone',
    label: 'Phone',
    validator: validators.stringNotBlank,
  },
  fax: {
    name: 'fax',
    label: 'Fax',
    validator: validators.stringNotBlank,
  },
  email: {
    name: 'email',
    label: 'Email',
    validator: validators.emailValidation,
  },
  cityName: {
    name: 'cityName',
    label: 'Ville',
    validator: validators.stringNotBlank,
  },
};
