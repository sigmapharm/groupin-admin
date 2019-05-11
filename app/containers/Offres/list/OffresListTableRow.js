import React from 'react';
import * as PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import FileCopy from '@material-ui/icons/FileCopy';
import HighlightOff from '@material-ui/icons/HighlightOff';
import Search from '@material-ui/icons/Search';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import "react-sweet-progress/lib/style.css";
import { Progress } from 'react-sweet-progress';
const champprogress = {width:"20%"};
const champAction={width:"23%"};
export class OffresListTableRow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {isdisplaydata: false,};
  }

  edit = (row) => {
    this.setState({
      isdisplaydata: true,
    });
  }
  handledetailclose = () => {
    this.setState({
      isdisplaydata: false,
    });
  };

 render() {
    const { row } = this.props;
    const dateFin = new Date( row.dateFin );
    const dateDebut = new Date( row.dateDebut );
    const mSecondesParJour = 86400 * 1000;
    const dureeGolbale = ( dateFin - dateDebut ) / mSecondesParJour;
    const dureeAujoudhui = ( new Date() - dateDebut ) / mSecondesParJour;
    const avancement = Math.min(dureeAujoudhui / dureeGolbale, 1)  * 100;
   const avancementMontant = Math.min(row.montant /100000, 1)  * 100;
    const joursRestants = Math.floor( ( dateFin - new Date() ) / mSecondesParJour)+1;
    const joursLabel =  joursRestants=== 1 ? 'jour' : 'jours';
    const dateformat =new Intl.DateTimeFormat('fr-FR').format(dateFin);
    const dateformat2=new Intl.DateTimeFormat('fr-FR').format(dateDebut);
  return (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row" >
          {row.designation}
        </TableCell>
        <TableCell  >{row.laboratoire && row.laboratoire.nom}</TableCell>
        <TableCell  >{row.status}</TableCell>
        <TableCell style={champprogress} > {row.montant}{" MAD"}<Progress percent={avancementMontant}
                                                       theme={
                                                         {
                                                           error: {
                                                             symbol: ' ',
                                                             trailColor: 'pink',
                                                             color: 'red'
                                                           },
                                                           default: {
                                                             symbol: ' ',
                                                             trailColor: '#F2F3F4',
                                                             color: 'blue'
                                                           },
                                                           active: {
                                                             symbol:' ',
                                                             trailColor: '#D0D3D4',
                                                             color: '#42B391'
                                                           },
                                                           success: {
                                                             symbol: ' ',
                                                             trailColor: '#F2F3F4',
                                                             color: 'green'
                                                           }
                                                         }
                                                       }

        /> {avancementMontant +"%"}</TableCell>
        <TableCell  style={champprogress} >
          <Progress percent={avancement}
                    theme={
                      {
                        error: {
                          symbol: ' ',
                          trailColor: 'pink',
                          color: 'red'
                        },
                        default: {
                          symbol: ' ',
                          trailColor: '#F2F3F4',
                          color: 'blue'
                        },
                        active: {
                          symbol:' ',
                          trailColor: '#D0D3D4',
                          color: '#42B391'
                        },
                        success: {
                          symbol: ' ',
                          trailColor: '#F2F3F4',
                          color: 'green'
                        }
                      }
                    }
          />{joursRestants>0 ? "Il vous reste "+joursRestants+" "+joursLabel : "Offre clôturée !"}

        </TableCell>
         <TableCell style={champAction}>
           <Search color="secondary"  />
           <EditIcon color="primary" />
           <FileCopy color="secondary" />
           <HighlightOff color="error"/>
         </TableCell>
      </TableRow>
    );
  }
}

OffresListTableRow.defaultProps = {};

OffresListTableRow.propTypes = {
  row: PropTypes.object.isRequired,
};
export default OffresListTableRow;
