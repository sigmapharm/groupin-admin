export const formatPharmacieToLabelValue = pharmacie =>
  pharmacie && {
    label: pharmacie.denomination,
    value: pharmacie.id,
  };

export const formatCityToLabelValue = city => city && { label: city.name, value: city.id };
export const formaRegionToLabelValue = city => city && { label: city.name, value: city.id, id: city.id };
