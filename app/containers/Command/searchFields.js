export default dispatch => [
  {
    name: 'offerName',
    label: 'Offre désignation',
    type: 'text',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
    isGrouped: true,
  },
  {
    name: 'laboratoryName',
    label: 'Laboratoire',
    type: 'text',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
    isGrouped: true,
  },
  // {
  //   name: 'ville',
  //   label: 'Ville',
  //   type: 'text',
  //   onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  // },
  // {
  //   name: 'denomination',
  //   label: 'Pharmacie',
  //   type: 'text',
  //   onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  // },
  {
    name: 'from',
    label: 'From',
    type: 'date',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
    isGrouped: false,
  },
  {
    name: 'to',
    label: 'To',
    type: 'date',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
    isGrouped: false,
  },
  // {
  //   name: 'region',
  //   label: 'region',
  //   type: 'text',
  //   onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  // },
];
