import React,{ Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import Progressbar from './Progressbar';
import Divider from '@material-ui/core/Divider';


const HeaderStyle = {
 backgroundColor: 'lightgray',
};


const champprogress = { width: '20%' };


export class OffreListConsultMembre extends React.PureComponent {
 constructor(props) {
   super(props);
   this.state = {};
 }

 render() {
   const { row, avancement } = this.props;
//    const datefin = new Date(row.dateFin);
//    const mSecondesParJour = 86400 * 1000;
//    const joursRestants = Math.floor((datefin - new Date()) / mSecondesParJour) + 1;
//    const joursLabel = joursRestants === 1 ? 'jour' : 'jours';
//  const dateformat = new Intl.DateTimeFormat('fr-FR').format(datefin);
   return (
     <React.Fragment>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Désignation</TableCell>
             <TableCell>Laboratoire</TableCell>
             <TableCell>quantité minimal ( par article)</TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
            </TableRow></TableHead>
         <TableBody>
           <TableRow>
             <TableCell component="th" scope="row">{row.designation}</TableCell>
             <TableCell>{row.laboratoire && row.laboratoire.nom}</TableCell>
             <TableCell>{row.quantiteMin}</TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
           </TableRow>
         </TableBody></Table>
       <div style={{height:'20px'}}></div>
       <Divider variant="middle" style={{backgroundColor:'#276955',width:'50%',marginLeft:'25%'}}/>
       <div style={{height:'20px'}}></div>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Date fin</TableCell>
             <TableCell>TimeLine</TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
           </TableRow></TableHead>
         <TableBody>
           <TableRow>
             <TableCell>{dateformat}</TableCell>
             <TableCell style={champprogress}>
               <Progressbar progress={avancement}/>
               {joursRestants > 0 ? 'Il vous reste ' + joursRestants + ' ' + joursLabel : 'Offre clôturée !'}
             </TableCell>
          </TableRow>
         </TableBody></Table>


     </React.Fragment>

   );
 }
}

OffreListConsultMembre = {
 row: PropTypes.object.isRequired,
};


export default OffreListConsultMembre;