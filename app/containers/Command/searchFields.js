export default dispatch => [
  {
    name: 'offerName',
    label: 'Offre désignation',
    type: 'text',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  },
  {
    name: 'laboratoryName',
    label: 'Laboratoire',
    type: 'text',
    onChange: ({ target: { name, value } }) => dispatch({ [name]: value }),
  },
];
