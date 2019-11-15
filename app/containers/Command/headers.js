export const commandHeadersWithOption = (C) => [
    ...C,
  { title: 'Actions' },
];
export const commandHeaders = [
  { title: 'Offre désignation' },
  { title: 'Laboratoire' },
  { title: 'Pharmacie' },
  { title: 'Date commande' },
  { title: 'Total' },
];
export const articleHeaders = [
  { title: 'DESIGNATION' },
  { title: 'PPH' },
  { title: 'PPV' },
  { title: 'TVA' },
  { title: 'REMISE' },
  { title: 'PPH REMISE' },
  { title: 'QUANTITE' },
  { title: 'QUANTITE LIVREE' },
];
export const adminCommandArticlesHeadersForUpdate = (Component)=> [
  { title: 'DESIGNATION' },
  { title: 'PPH' },
  { title: 'PPV' },
  { title: 'TVA' },
  { title: 'REMISE' },
  { title: 'PPH REMISE' },
  Component,
  { title: 'QUANTITE LIVREE' },
];
export const articleHeadersForUpdate = [
  { title: '' },
  { title: 'DESIGNATION' },
  { title: 'PPH' },
  { title: 'PPV' },
  { title: 'TVA' },
  { title: 'REMISE' },
  { title: 'PPH REMISE' },
  { title: 'QUANTITE' },
  { title: 'QUANTITE LIVREE' },
];

