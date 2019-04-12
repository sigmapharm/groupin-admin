export const formatPharmacieToLabelValue = pharmacie =>
  pharmacie && {
    label: pharmacie.denomination,
    value: pharmacie.id,
  };
