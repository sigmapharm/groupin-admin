export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
const REGEX_PHONE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; // eslint-disable-line no-useless-escape

const stringNotBlank = value =>
  !!value && !!value.trim() ? null : 'Ne peut pas être vide';

const selectNotBlank = value =>
  !!value ? null : 'Choisir à partir de la liste';

const emailValidation = value =>
  REGEX_EMAIL.test(String(value).toLowerCase())
    ? null
    : "Le format de l'email est invalide";

const phoneValidation = value =>
  REGEX_PHONE.test(String(value).toLowerCase())
    ? null
    : 'Le format du numéro est invalide';

const validate = (result, fieldName, fieldLabel, value, validator) => {
  const validation = validator(value);
  if (validation) {
    return {
      fields: {
        ...result.fields,
        [fieldName]: true,
      },
      messages: {
        ...result.messages,
        [fieldLabel]: validation,
      },
    };
  }
  return { ...result };
};

export const validateFormData = formData => {
  let validationResult = {};
  validationResult = validate(
    validationResult,
    'nom',
    'Nom',
    formData.nom,
    stringNotBlank,
  );
  validationResult = validate(
    validationResult,
    'prenom',
    'Prénom',
    formData.prenom,
    stringNotBlank,
  );
  validationResult = validate(
    validationResult,
    'cin',
    'CIN',
    formData.cin,
    stringNotBlank,
  );
  validationResult = validate(
    validationResult,
    'email',
    'Email',
    formData.email,
    emailValidation,
  );
  validationResult = validate(
    validationResult,
    'telephone',
    'Téléphone',
    formData.telephone,
    phoneValidation,
  );
  validationResult = validate(
    validationResult,
    'gsm',
    'GSM',
    formData.gsm,
    phoneValidation,
  );
  validationResult = validate(
    validationResult,
    'ville',
    'Ville',
    formData.ville,
    stringNotBlank,
  );
  validationResult = validate(
    validationResult,
    'codePostal',
    'Code postal',
    formData.codePostal,
    stringNotBlank,
  );
  validationResult = validate(
    validationResult,
    'pharmacie',
    'Pharmacie',
    formData.pharmacie,
    selectNotBlank,
  );

  return validationResult;
};
