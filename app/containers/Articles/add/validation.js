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
    fields.reference,
    formData.reference,
  );
  validationResult = validate(validationResult, fields.nom, formData.nom);
  validationResult = validate(validationResult, fields.gamme, formData.gamme);
  validationResult = validate(
    validationResult,
    fields.codebare,
    formData.codebare,
  );
  validationResult = validate(
    validationResult,
    fields.categorie,
    formData.categorie,
  );
  validationResult = validate(
    validationResult,
    fields.classe_therapeutique,
    formData.classe_therapeutique,
  );
  validationResult = validate(
    validationResult,
    fields.forme_galenique,
    formData.forme_galenique,
  );
  validationResult = validate(validationResult, fields.dci, formData.dci);
  validationResult = validate(validationResult, fields.pph, formData.pph);
  validationResult = validate(validationResult, fields.tva, formData.tva);
  validationResult = validate(
    validationResult,
    fields.laboratoire,
    formData.laboratoire,
  );
  return validationResult;
};

export const fields = {
  reference: {
    name: 'reference',
    label: 'Référence',
    validator: validators.stringNotBlank,
  },
  nom: {
    name: 'nom',
    label: 'Nom',
    validator: validators.stringNotBlank,
  },
  gamme: {
    name: 'gamme',
    label: 'Gamme ' + "d'" + 'article',
    validator: validators.stringNotBlank,
  },
  codebare: {
    name: 'codebare',
    label: 'Code Barre',
    validator: validators.stringNotBlank,
  },
  categorie: {
    name: 'categorie',
    label: 'Catégorie',
    validator: validators.stringNotBlank,
  },
  classe_therapeutique: {
    name: 'classe_therapeutique',
    label: 'Classe thèrapeutique',
    validator: validators.stringNotBlank,
  },

  forme_galenique: {
    name: 'forme_galenique',
    label: 'Forme galénique',
    validator: validators.stringNotBlank,
  },
  pph: {
    name: 'pph',
    label: 'PPH',
    validator: validators.stringNotBlank,
  },
  tva: {
    name: 'tva',
    label: 'TVA',
    validator: validators.stringNotBlank,
  },
  ppv: {
    name: 'ppv',
    label: 'PPV',
    validator: validators.stringNotBlank,
  },
  dci: {
    name: 'dci',
    label: 'DCI',
    validator: validators.stringNotBlank,
  },
  laboratoire: {
    name: 'laboratoire',
    label: 'Laboratoire',
    validator: validators.selectNotBlank,
  },
  neccissite_prescription: {
    name: 'neccissite_prescription',
    label: 'avec préscription',
  },
  produit_Marche: {
    name: ' produit_Marche',
    label: 'produit Marché',
  },
};
