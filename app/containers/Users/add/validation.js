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
    fields.lastName,
    formData.lastName,
  );
  validationResult = validate(
    validationResult,
    fields.firstName,
    formData.firstName,
  );
  validationResult = validate(validationResult, fields.cin, formData.cin);
  validationResult = validate(validationResult, fields.email, formData.email);
  validationResult = validate(validationResult, fields.tel, formData.tel);
  validationResult = validate(validationResult, fields.gsm, formData.gsm);
  validationResult = validate(validationResult, fields.ville, formData.ville);
  validationResult = validate(
    validationResult,
    fields.codePostal,
    formData.codePostal,
  );
  validationResult = validate(
    validationResult,
    fields.pharmacie,
    formData.pharmacie,
  );
  validationResult = validate(validationResult, fields.role, formData.role);

  return validationResult;
};

export const fields = {
  lastName: {
    name: 'lastName',
    label: 'Nom',
    validator: validators.stringNotBlank,
  },
  firstName: {
    name: 'firstName',
    label: 'Prénom',
    validator: validators.stringNotBlank,
  },
  cin: {
    name: 'cin',
    label: 'CIN',
    validator: validators.stringNotBlank,
  },
  email: {
    name: 'email',
    label: 'Email',
    validator: validators.emailValidation,
  },
  tel: {
    name: 'tel',
    label: 'Téléphone',
    validator: validators.phoneValidation,
  },
  gsm: {
    name: 'gsm',
    label: 'GSM',
    validator: validators.phoneValidation,
  },
  ville: {
    name: 'ville',
    label: 'Ville',
    validator: validators.selectNotBlank,
  },
  codePostal: {
    name: 'codePostal',
    label: 'Code Postal',
    validator: validators.stringNotBlank,
  },
  pharmacie: {
    name: 'pharmacie',
    label: 'Pharmacie',
    validator: validators.selectNotBlank,
  },
  role: {
    name: 'role',
    label: 'Role',
    validator: validators.selectNotBlank,
  },
};
