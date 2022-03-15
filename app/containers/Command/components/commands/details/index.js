import React from 'react';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography/Typography';
import Divider from '@material-ui/core/Divider/Divider';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import TextField from '@material-ui/core/TextField/TextField';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ListIcon from '@material-ui/icons/ArrowRight';
import {
  adminCommandArticlesHeadersForUpdate,
  articleHeaders,
  articleHeadersForUpdate,
} from '../../../headers';
import Table from '../../../../../components/Table';

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
  ({
    list,
    metadata,
    classes,
    readMode = true,
    onChange,
    isAdmin,
    forAdmin,
    copyQuantities,
  }) => {
    const deliveredTotalAmount =
      _.sumBy(
        list,
        ({ modifiedQuantity, computedPPH, selected }) =>
          selected * (modifiedQuantity || 0) * computedPPH || 0,
      ) || 0;
    const discount = 1 - metadata.globalDiscount / 100 || 1;
    return (
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
              {moment(metadata.creationDate).format('DD/MM/YYYY')}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Escompte</Typography>
            <Typography variant="h6" component="h2">
              {metadata.globalDiscount}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Total commande </Typography>
            <Typography variant="h6" component="h2">
              {(metadata.totalAmount || 1).toFixed(2)}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary"> Total Remisé </Typography>
            <Typography variant="h6" component="h2">
              {(metadata.totalAmountDiscount || 1).toFixed(2)}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Total Aprés Escompte</Typography>
            <Typography variant="h6" component="h2">
              {(metadata.totalAmountDiscount * discount || 1).toFixed(2)}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">Total Livraison</Typography>
            <Typography variant="h6" component="h2">
              {deliveredTotalAmount.toFixed(2)}
            </Typography>
          </div>
          <div className={classes.metaItems}>
            <Typography color="textSecondary">
              Total Livraison Remisé
            </Typography>
            <Typography variant="h6" component="h2">
              {(deliveredTotalAmount * discount).toFixed(2)}
            </Typography>
          </div>
        </div>
        <Divider variant="middle" />
        <Table
          headers={
            readMode
              ? articleHeaders
              : isAdmin
                ? forAdmin
                  ? adminCommandArticlesHeadersForUpdate(
                      <>
                        <span>QUANTITE</span>
                        <Tooltip
                          placement="top"
                          title="Copier les quantités vers les quantités livrées"
                        >
                          <IconButton
                            onClick={copyQuantities}
                            style={{ padding: 5 }}
                          >
                            <ListIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                      </>,
                    )
                  : _.tail(articleHeadersForUpdate)
                : articleHeadersForUpdate
          }
          pageable={false}
        >
          {!!list.length && (
            <>
              {list
                .filter(
                  ({ selected }) =>
                    readMode || (isAdmin && !forAdmin) ? selected : true,
                )
                .map((article, index) => (
                  <TableRow key={article.offerArticleId}>
                    {/* {!isAdmin &&
                      !readMode && (
                      <TableCell>
                        <Checkbox
                          onChange={({ target: { checked } }) =>
                            onChange({ selected: checked, index })
                          }
                          checked={!!article.selected}
                        />
                      </TableCell>
                    )} */}
                    <TableCell>{article.label}</TableCell>
                    <TableCell>{article.pph.toFixed(2)}</TableCell>
                    <TableCell>{article.ppv.toFixed(2)}</TableCell>
                    <TableCell>{article.tva.toFixed(2)}</TableCell>
                    <TableCell>{article.discount}</TableCell>
                    <TableCell>{article.computedPPH.toFixed(2)}</TableCell>
                    <TableCell>
                      {!readMode &&
                      ((isAdmin && forAdmin) || (!isAdmin && !forAdmin)) ? (
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
                      ) : (
                        article.quantity
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
                          //disabled={!article.selected}
                          autoComplete="off"
                          inputProps={{ maxLength: 100 }}
                          fullWidth
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </>
          )}
        </Table>
      </>
    );
  },
);
