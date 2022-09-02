import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export const RowCheckBox = ({ editMode, row, handleArticleRowChange, index }) => {
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(
    () => {
      handleArticleRowChange({
        discount: row.discount,
        minQuantity: row.minQuantity,
        selected: row.discount && row.minQuantity,
        required: isChecked,
        index,
      });
    },
    [isChecked],
  );

  React.useEffect(
    () => {
      if (!row.discount || !row.minQuantity) {
        handleArticleRowChange({
          discount: row.discount,
          minQuantity: row.minQuantity,
          selected: row.discount && row.minQuantity,
          required: false,
          index,
        });
        setIsChecked(false);
      }
    },
    [row.discount, row.minQuantity],
  );

  return (
    <Checkbox
      helperText="Veuillez remplir les champs vides"
      disabled={editMode || !(row.discount && row.minQuantity)}
      onChange={({ target: { checked } }) => setIsChecked(checked)}
      checked={isChecked}
    />
  );
};
