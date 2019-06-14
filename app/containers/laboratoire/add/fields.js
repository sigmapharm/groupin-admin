import validators from '../../../core/validation';

export const defaultOptionsFormatter = value =>
  (value && {
    label: value,
    value,
  }) ||
  '';
export const laboratoiresFields = [
  {
    id: 'nom',
    name: 'nom',
    label: 'Nom',
    validator: validators.stringNotBlank,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    validator: validators.emailValidation,
  },
  {
    id: 'website',
    name: 'website',
    label: 'Website',
    validator: validators.stringNotBlank,
  },

  {
    id: 'description',
    name: 'description',
    label: 'Description',
    validator: validators.stringNotBlank,
  },
  {
    id: 'adresse',
    name: 'adresse',
    label: 'Adresse',
    validator: validators.stringNotBlank,
  },
];

const validateField = (result, fieldName, allData) => {
  const fieldDef = laboratoiresFields.find(t => t.name === fieldName);
  const validation = fieldDef.validator(allData[fieldName]);
  if (validation) {
    return {
      fields: {
        ...result.fields,
        [fieldDef.name]: true,
      },
      messages: {
        ...result.messages,
        [fieldDef.label || fieldDef.placeholder]: validation,
      },
    };
  }
  return { ...result };
};

export const validateFormData = formData => {
  let validationResult = {};
  const keys = Object.keys(formData);
  keys.forEach(key => {
    validationResult = validateField(validationResult, key, formData);
  });
  return validationResult;
};
