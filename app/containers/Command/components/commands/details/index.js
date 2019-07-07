import React from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import TextField from '@material-ui/core/TextField/TextField';
import Table from '../../../../../components/Table';
import {articleHeaders, articleHeadersForUpdate} from '../../../headers';

const styles = theme => ({
  metaContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    margin: '20px 10px',
  },
  metaItems: {
    paddingRight: '2em',
    display: 'inline-block',
  },
  commandButton: {
    marginTop: '15px',
  },
  totalAmount: {
    textAlign: 'right',
    marginRight: '10px',
  },
});

export default withStyles(styles)(
  ({ list, metadata, classes, readMode = true, onChange, isAdmin }) => (
    <>
      <div className={classes.metaContainer}>
        <div className={classes.metaItems}>
          <Typography color="textSecondary">Offre</Typography>
          <Typography variant="h6" component="h2">
            {metadata.offerName}
          </Typography>
        </div>
        <div className={classes.metaItems}>
          <Typography color="textSecondary">Laboratoire</Typography>
          <Typography variant="h6" component="h2">
            {metadata.laboratoryName}
          </Typography>
        </div>
        <div className={classes.metaItems}>
          <Typography color="textSecondary">Date de creation</Typography>
          <Typography variant="h6" component="h2">
            {moment(metadata.creationDate).format('YYYY-MM-DD')}
          </Typography>
        </div>
        <div className={classes.metaItems}>
          <Typography color="textSecondary">Prix total</Typography>
          <Typography variant="h6" component="h2">
            {metadata.totalAmount.toFixed(2)}
          </Typography>
        </div>
      </div>
      <Divider variant="middle" />
      <Table
        headers={readMode ? articleHeaders : articleHeadersForUpdate}
        pageable={false}
      >
        {!!list.length && (
          <>
            {list
              .filter(({ selected }) => (readMode ? selected : true))
              .map((article, index) => (
                <TableRow key={article.offerArticleId}>
                  {!readMode && (
                    <TableCell>
                      {' '}
                      <Checkbox
                        onChange={({ target: { checked } }) =>
                          onChange({ selected: checked, index })
                        }
                        checked={!!article.selected}
                      />{' '}
                    </TableCell>
                  )}
                  <TableCell>{article.label}</TableCell>
                  <TableCell>{article.pph.toFixed(2)}</TableCell>
                  <TableCell>{article.ppv.toFixed(2)}</TableCell>
                  <TableCell>{article.tva.toFixed(2)}</TableCell>
                  <TableCell>{article.computedPPH.toFixed(2)}</TableCell>
                  <TableCell>
                    {readMode ? (
                      article.quantity
                    ) : (
                      <TextField
                        name="quantity"
                        label="Quantité"
                        value={article.quantity || ''}
                        type="number"
                        onChange={({ target: { value } }) =>
                          onChange({ index, quantity: +value })
                        }
                        disabled={!article.selected}
                        autoComplete="off"
                        inputProps={{ maxLength: 100 }}
                        fullWidth
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {!isAdmin || readMode ? (
                      article.modifiedQuantity || '-'
                    ) : (
                      <TextField
                        name="quantity"
                        label="Quantité"
                        value={article.modifiedQuantity || ''}
                        type="number"
                        onChange={({ target: { value } }) =>
                          onChange({ index, modifiedQuantity: +value })
                        }
                        disabled={!article.selected}
                        autoComplete="off"
                        inputProps={{ maxLength: 100 }}
                        fullWidth
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell
                className={classes.totalAmount}
                colSpan={articleHeaders.length + 1}
              >
                Total :{' '}
                {_.sumBy(
                  list,
                  ({ quantity, computedPPH, selected }) =>
                    selected * quantity * computedPPH || 0,
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </>
        )}
      </Table>
    </>
  ),
);
