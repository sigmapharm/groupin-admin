export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
const REGEX_PHONE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; // eslint-disable-line no-useless-escape

const stringNotBlank = value =>
  !!value && !!value.trim() ? null : 'Ne peut pas être vide';

const selectNotBlank = value => (value ? null : 'Choisir à partir de la liste');

const emailValidation = value =>
  REGEX_EMAIL.test(String(value).toLowerCase())
    ? null
    : "Le format de l'email est invalide";

const phoneValidation = value =>
  REGEX_PHONE.test(String(value).toLowerCase())
    ? null
    : 'Le format du numéro est invalide';

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
  validationResult = validate(validationResult, fields.prenom, formData.prenom);
  validationResult = validate(validationResult, fields.cin, formData.cin);
  validationResult = validate(validationResult, fields.email, formData.email);
  validationResult = validate(
    validationResult,
    fields.telephone,
    formData.telephone,
  );
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

  return validationResult;
};

export const fields = {
  nom: {
    name: 'nom',
    label: 'Nom',
    validator: stringNotBlank,
  },
  prenom: {
    name: 'prenom',
    label: 'Prénom',
    validator: stringNotBlank,
  },
  cin: {
    name: 'cin',
    label: 'CIN',
    validator: stringNotBlank,
  },
  email: {
    name: 'email',
    label: 'Email',
    validator: emailValidation,
  },
  telephone: {
    name: 'telephone',
    label: 'Téléphone',
    validator: phoneValidation,
  },
  gsm: {
    name: 'gsm',
    label: 'GSM',
    validator: phoneValidation,
  },
  ville: {
    name: 'ville',
    label: 'Ville',
    validator: stringNotBlank,
  },
  codePostal: {
    name: 'codePostal',
    label: 'Code Postal',
    validator: stringNotBlank,
  },
  pharmacie: {
    name: 'pharmacie',
    label: 'Pharmacie',
    validator: selectNotBlank,
  },
};
