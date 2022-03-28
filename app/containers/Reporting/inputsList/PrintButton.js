import { Fab } from '@material-ui/core';
import { Print } from '@material-ui/icons';
import React from 'react';

const PrintButton = ({ className, onClick, type }) => {
  return (
    <Fab color="primary" className={className} onClick={onClick} type={type}>
      <Print />
    </Fab>
  );
};

export default PrintButton;
