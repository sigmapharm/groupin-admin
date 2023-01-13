import validators from '../../core/validation';

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
  validationResult = validate(validationResult, fields.link, formData.link);
  validationResult = validate(validationResult, fields.is_active, formData.is_active);
  validationResult = validate(validationResult, fields.message, formData.message);
  validationResult = validate(validationResult, fields.date_start, formData.date_start);
  validationResult = validate(validationResult, fields.date_end, formData.date_end);
  validationResult = validate(validationResult, fields.alert_type, formData.alert_type);
  return validationResult;
};

export const fields = {
  link: {
    name: 'link',
    label: 'Link',
    validator: validators.stringNotBlank,
  },
  is_active: {
    name: 'is_active',
    label: 'status',
    validator: validators.stringNotBlank,
  },
  message: {
    name: 'message',
    label: 'message',
    validator: validators.stringNotBlank,
  },
  date_start: {
    name: 'date_start',
    label: 'date start',
    validator: validators.stringNotBlank,
  },
  date_end: {
    name: 'date_end',
    label: 'date end',
    validator: validators.stringNotBlank,
  },
  alert_type: {
    name: 'alert type',
    label: 'alert_type',
    validator: validators.stringNotBlank,
  },
};
