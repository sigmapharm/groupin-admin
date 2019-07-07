import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TextField from '@material-ui/core/TextField/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '../../../../components/Table';

const articleHeaders = [
  { title: 'label' },
  { title: 'pph' },
  { title: 'ppv' },
  { title: 'tva' },
  { title: 'pph remisé' },
  { title: 'quantité' },
  { title: 'quantité ajuster' },
];

const styles = theme => ({

});

export default withStyles(styles)(({ articles = [], onChange }) => (
  <>
    <Table headers={articleHeaders} pageable={false}>
      {articles.map((article, index) => (
        <TableRow key={article.offerArticleId}>
          <TableCell>{article.label}</TableCell>
          <TableCell>{article.pph.toFixed(2)}</TableCell>
          <TableCell>{article.ppv.toFixed(2)}</TableCell>
          <TableCell>{article.tva.toFixed(2)}</TableCell>
          <TableCell>{article.computedPPH.toFixed(2)}</TableCell>
          <TableCell>{article.quantity}</TableCell>
          <TableCell>
            <TextField
              name="modifiedQuantity"
              label="Quantité Ajusté"
              value={article.modifiedQuantity || ''}
              type="number"
              onChange={({ target: { value } }) =>
                onChange({ index, modifiedQuantity: +value })
              }
              autoComplete="off"
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  </>
));
