export default dispatch => [
  // {
  //   name: 'offerName',
  //   label: 'Offre désignation',
  //   type: 'text',
  //   onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  // },
  // {
  //   name: 'laboratoryName',
  //   label: 'Laboratoire',
  //   type: 'text',
  //   onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  // },
  {
    name: 'ville',
    label: 'Ville',
    type: 'text',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  },
  {
    name: 'denomination',
    label: 'Pharmacie',
    type: 'text',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  },
  // {
  //   name: 'region',
  //   label: 'region',
  //   type: 'text',
  //   onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  // },
];
