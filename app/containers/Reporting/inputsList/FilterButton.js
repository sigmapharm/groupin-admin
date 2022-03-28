import { Fab } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';

const FilterButton = ({ className, onClick, type }) => {
  return (
    <Fab color="primary" className={className} onClick={onClick} type={type}>
      <Search />
    </Fab>
  );
};

export default FilterButton;
