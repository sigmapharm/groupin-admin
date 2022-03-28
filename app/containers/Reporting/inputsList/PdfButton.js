import { Fab } from '@material-ui/core';
import { PictureAsPdf, Search } from '@material-ui/icons';
import React from 'react';

const PDFButton = ({ className, onClick, type }) => {
  return (
    <Fab color="primary" className={className} onClick={onClick} type={type}>
      <PictureAsPdf />
    </Fab>
  );
};

export default PDFButton;
