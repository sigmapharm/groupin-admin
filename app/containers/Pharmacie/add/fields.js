import validators from '../../../core/validation';

export const defaultOptionsFormatter = value =>
  (value && {
    label: value,
    value,
  }) ||
  '';
export const pharmacieFields = [
  {
    id: 'denomination',
    name: 'denomination',
    label: 'Dénomination',
    validator: validators.stringNotBlank,
  },
  {
    id: 'adresse',
    name: 'adresse',
    label: 'Adresse',
    validator: validators.stringNotBlank,
  },
  {
    id: 'tel',
    name: 'tel',
    type: 'number',
    label: 'Téléphone',
    validator: validators.stringNotBlank,
  },
  {
    id: 'gsm',
    name: 'gsm',
    label: 'Gsm',
    type: 'number',
    validator: validators.stringNotBlank,
  },
  {
    id: 'patente',
    name: 'patente',
    label: 'Patente',
    validator: validators.stringNotBlank,
  },
  {
    id: 'numRC',
    name: 'numRC',
    label: 'Numéro RC',
    validator: validators.stringNotBlank,
  },
  {
    id: 'interlocuteur',
    name: 'interlocuteur',
    label: 'Interlocuteur',
    validator: validators.stringNotBlank,
  },
  {
    id: 'fonction',
    name: 'fonction',
    label: 'Fonction',
    validator: validators.stringNotBlank,
  },
  {
    id: 'ice',
    name: 'ice',
    label: "Identifiant commun de l'entreprise",
    validator: validators.stringNotBlank,
  },
  {
    id: 'dateDemarrage',
    name: 'dateDemarrage',
    type: 'date',
    label: 'Date de démarrage',
    specialProps: {
      InputLabelProps: {
        shrink: true,
      },
      // defaultValue: formatDate(new Date()),
      style: {
        width: '100%',
      },
      label: 'Date de démarrage',
    },
    validator: validators.stringNotBlank,
  },
  {
    id: 'dateCreation',
    name: 'dateCreation',
    type: 'date',
    label: 'Date de création',
    specialProps: {
      InputLabelProps: {
        shrink: true,
      },
      style: {
        width: '100%',
      },
      label: 'Date de création',
    },
    validator: validators.stringNotBlank,
  },
  {
    id: 'formeJuridique',
    name: 'formeJuridique',
    placeholder: 'Forme Juridique',
    optionFormatter: e => e && { label: e.label, value: e.value },
    select: true,
    options: [{ label: 'PHYSIQUE', value: 'PHYSIQUE' }, { label: 'SARL', value: 'SARL' }, { label: 'AUTRE', value: 'AUTRE' }],
    validator: validators.selectNotBlank,
  },
  {
    id: 'banque',
    name: 'banque',
    placeholder: 'Banque',
    optionFormatter: e => e && { label: e.label, value: e.value },
    select: true,
    options: [
      { label: 'BMCI', value: 'BMCI' },
      { label: 'Attijari Wafa Bank', value: 'AWB' },
      { label: 'BMCE', value: 'BMCE' },
      { label: 'GFG', value: 'GFG' },
      { label: 'AWB', value: 'AWB' },
      { label: 'GFG', value: 'GFG' },
      { label: 'Banque populaire', value: 'BP' },
      { label: 'CIH', value: 'CIH' },
      { label: 'Crédit du Maroc', value: 'CDM' },
      { label: 'Crédit Agricole du Maroc', value: 'CAM' },
      { label: 'Al Barid Bank', value: 'ABB' },
      { label: 'Bank Assafa', value: 'BA' },
      { label: 'Bank Al Yousr', value: 'BAY' },
      { label: 'Arab Bank', value: 'AB' },
      { label: 'Dar Al Amane', value: 'DAA' },
      { label: 'Umnia Bank', value: 'UB' },
      { label: 'Societe Generale', value: 'SG' },
    ],
    validator: validators.selectNotBlank,
  },
  {
    id: 'region',
    name: 'region',
    placeholder: 'Region',
    select: true,
    optionFormatter: e => e && { label: e.name, value: e.id },
    options: [],
    validator: validators.selectNotBlank,
  },
  {
    id: 'ville',
    name: 'ville',
    placeholder: 'Ville',
    select: true,
    optionFormatter: e => e && { label: e.name, value: e.id },
    options: [],
    validator: validators.selectNotBlank,
  },
];

const validateField = (result, fieldName, allData) => {
  const fieldDef = pharmacieFields.find(t => t.name === fieldName);
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
