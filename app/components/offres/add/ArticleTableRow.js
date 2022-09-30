import React from 'react';
import AticlesListTableRow from './ArticlesRow';

export const InputArticleTableRow = ({
  disableAllFields,
  disableAllFieldsExceptDate,
  handleArticleRowChange,
  row,
  editMode,
  index,
}) => {
  return (
    <AticlesListTableRow
      index={index}
      handleArticleRowChange={disableAllFields || disableAllFieldsExceptDate ? () => {} : handleArticleRowChange}
      key={row.id}
      row={row}
      editMode={editMode}
      editModec={true}
    />
  );
};
