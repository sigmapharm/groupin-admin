const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
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

const validators = {
  stringNotBlank,
  selectNotBlank,
  emailValidation,
  phoneValidation,
};

export default validators;
