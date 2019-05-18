import React from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Divider from '@material-ui/core/Divider';

const head = { backgroundColor: 'lightgreen' };
const addCommas = nStr => {
  nStr += '';
  const x = nStr.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export class ArticleListConsultationn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { row } = this.props;
    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Référence</TableCell>
              <TableCell>Désignation</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Gamme</TableCell>
              <TableCell>Forme galénique</TableCell>
              <TableCell>DCI</TableCell>
              <TableCell>Classe thérapeutique</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{row.reference}</TableCell>
              <TableCell>{row.nom}</TableCell>
              <TableCell>{row.categorie}</TableCell>
              <TableCell>{row.gamme}</TableCell>
              <TableCell>{row.forme_galenique}</TableCell>
              <TableCell>{row.dci}</TableCell>
              <TableCell>{row.classe_therapeutique}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{ height: '20px' }} />
        <Divider
          variant="middle"
          style={{
            backgroundColor: '#276955',
            width: '50%',
            marginLeft: '25%',
          }}
        />
        <div style={{ height: '20px' }} />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PPH</TableCell>
              <TableCell>PPV</TableCell>
              <TableCell>TVA (%)</TableCell>
              <TableCell>Nessite préscription</TableCell>
              <TableCell>Produit marché</TableCell>
              <TableCell>Code barre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {addCommas(row.pph.toFixed(2))
                  .replace(/,/g, ' ')
                  .replace('.', ',')}
              </TableCell>
              <TableCell>
                {addCommas(row.ppv.toFixed(2))
                  .replace(/,/g, ' ')
                  .replace('.', ',')}
              </TableCell>
              <TableCell>{row.tva}</TableCell>
              <TableCell>{row.neccissite_prescription}</TableCell>
              <TableCell>{row.produit_Marche}</TableCell>
              <TableCell>{row.codebare}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{ height: '20px' }} />
        <Divider
          variant="middle"
          style={{
            backgroundColor: '#276955',
            width: '50%',
            marginLeft: '25%',
          }}
        />
        <div style={{ height: '20px' }} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Laboratoire</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Déscription</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{row.laboratoire && row.laboratoire.nom}</TableCell>
              <TableCell>{row.laboratoire.adresse}</TableCell>
              <TableCell>{row.laboratoire.website}</TableCell>
              <TableCell>{row.laboratoire.email}</TableCell>
              <TableCell>{row.laboratoire.description}</TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

ArticleListConsultationn.defaultProps = {};
ArticleListConsultationn.propTypes = {
  row: PropTypes.object.isRequired,
};
export default ArticleListConsultationn;
