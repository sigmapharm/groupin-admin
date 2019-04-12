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
    id: 'fax',
    name: 'fax',
    label: 'Fax',
    type: 'number',
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
    id: 'formeJuridique',
    name: 'formeJuridique',
    placeholder: 'Forme Juridique',
    formatter: defaultOptionsFormatter,
    select: true,
    options: ['SARL', 'Autre'],
    validator: validators.selectNotBlank,
  },
  {
    id: 'banque',
    name: 'banque',
    placeholder: 'Banque',
    formatter: defaultOptionsFormatter,
    select: true,
    options: ['BMCI', 'BMCE', 'GFI'],
    validator: validators.selectNotBlank,
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
      // defaultValue: formatDate(new Date()),
      style: {
        width: '100%',
      },
      label: 'Date de création',
    },
    validator: validators.stringNotBlank,
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
  console.log(formData)
  let validationResult = {};
  const keys = Object.keys(formData);
  keys.forEach(key => {
    validationResult = validateField(validationResult, key, formData);
  });
  return validationResult;
};
