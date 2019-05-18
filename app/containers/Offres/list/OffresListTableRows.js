import React ,{ Fragment } from 'react';
import * as PropTypes from 'prop-types';
import Search from '@material-ui/icons/Search';
import Shoping from '@material-ui/icons/ShoppingCart';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import 'react-sweet-progress/lib/style.css';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Progressbar from '../offreLitConsultMember/Progressbar';
import { Table, TableHead, TableBody, Divider } from '@material-ui/core';

const tabelcel = { width: "13px"};
const champdesignation = {width:"24%"};
const champtimeline = {width:"45%"};

export class OffresListTableRows extends React.PureComponent {
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
    const joursRestants = Math.floor( ( dateFin - new Date() ) / mSecondesParJour)+1;
    const joursLabel =  joursRestants=== 1 ? 'jour' : 'jours';
    const dateformat =new Intl.DateTimeFormat('fr-FR').format(dateFin);
    return (
  <React.Fragment>
          <TableRow key={row.id} >
            
              <TableCell component="th" scope="row"  style={champdesignation}>
                  {row.designation}
              </TableCell>
              <TableCell style={champtimeline}> 
            <Progressbar progress={avancement}/>  {joursRestants>0 ? "Il vous reste "+joursRestants+" "+joursLabel : "Offre clôturée !"}
            </TableCell>
            <TableCell>{dateformat}</TableCell>

            <TableCell style={tabelcel} >
              <Search color="primary" onClick={() => this.edit(row)} />
            </TableCell>
            <TableCell style={tabelcel}>
              <Shoping color="primary" />
            </TableCell>
        </TableRow>
      <Dialog
            maxWidth="lg"
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.isdisplaydata}>
                      <MuiDialogTitle disableTypography >
                              <Typography variant="h5" color="primary">
                                {`Details offre`}    <IconButton
                                aria-label="Close" style={{marginLeft:'50rem'}}
                                onClick={this.handledetailclose}
                              >
                                <CloseIcon />
                              </IconButton>
                              </Typography>
                      </MuiDialogTitle>
                      <MuiDialogContent>
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
             <TableCell >
               <Progressbar progress={avancement}/>
               {joursRestants > 0 ? 'Il vous reste ' + joursRestants + ' ' + joursLabel : 'Offre clôturée !'}
             </TableCell>
             <TableCell></TableCell>
             <TableCell></TableCell>
          </TableRow>
         </TableBody>
         </Table>
         <div style={{height:'20px'}}></div>
       <Divider variant="middle" style={{backgroundColor:'#276955',width:'50%',marginLeft:'25%'}}/>
       <div style={{height:'20px'}}></div>
         <Table>
<TableHead>
<TableRow>
  <TableCell>Désignation de l'article</TableCell>
  <TableCell>PPV</TableCell>
  <TableCell>PPH <hr style={{backgroundColor:'red',marginTop:'-10px',height:'0.2rem',width:'50px',marginLeft:'-8%'}}/></TableCell>
  <TableCell>Remise</TableCell>
  <TableCell>PPH remisé</TableCell>
</TableRow>

</TableHead>
<TableBody>
<TableRow>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>

</TableRow>

</TableBody>

         </Table>


     </React.Fragment>

                      </MuiDialogContent>
      </Dialog>
</React.Fragment>      
    );
    
  }
}

OffresListTableRows.defaultProps = {};

OffresListTableRows.propTypes = {
  row: PropTypes.object.isRequired,
};

export default OffresListTableRows;
