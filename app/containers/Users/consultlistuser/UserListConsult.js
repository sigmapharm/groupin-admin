import React,{ Fragment } from 'react';
import * as PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
const head ={backgroundColor:"lightgreen"};
const styles = theme => ({
    TableCell :{
        color:'red',
    }
});
export class UserListConsult extends React.PureComponent {
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
          <TableRow >
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
          <TableCell>Région</TableCell> 
         <TableCell>Adresse</TableCell> 
            <TableCell>Code  postale</TableCell>
          <TableCell>Ville</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow >
<TableCell> {row.firstName}</TableCell>
<TableCell> {row.lastName}</TableCell>
<TableCell> {row.email}</TableCell>
<TableCell> {row.region}</TableCell> 
<TableCell> {row.adresse}</TableCell>
<TableCell> {row.codePostal}</TableCell>
<TableCell> {row.ville}</TableCell>



        </TableRow>
         
        </TableBody>
      </Table>
      <div style={{height:'20px'}}></div>
      <Divider variant="middle"  style={{backgroundColor:'#276955',width:'50%',marginLeft:'25%'}}/>
      <div style={{height:'20px'}}></div>

<Table>
<TableHead>
    <TableRow>
    <TableCell>CIN</TableCell>
            <TableCell>Tél</TableCell>
            <TableCell>Gsm</TableCell>
            <TableCell>Date de création</TableCell>
            <TableCell>Rôle</TableCell>

    </TableRow>
</TableHead>
<TableBody>
    <TableRow>
    <TableCell> {row.cin}</TableCell>
<TableCell> {row.tel}</TableCell>
<TableCell> {row.gsm}</TableCell>
<TableCell> {row.dateCreation}</TableCell>
<TableCell> {row.role}</TableCell>

    </TableRow>
</TableBody>


</Table>
<div style={{height:'20px'}}></div>
      <Divider variant="middle"  style={{backgroundColor:'#276955',width:'50%',marginLeft:'25%'}}/>
      <div style={{height:'20px'}}></div>

      {/* <Typography variant="h5" color="primary">{'Details pharmacie'}</Typography> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom Pharmacie</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>tél</TableCell>
              <TableCell>Gsm</TableCell>
              <TableCell>Fax</TableCell>
              <TableCell>Patente</TableCell>
              <TableCell>Num RC</TableCell>
              <TableCell>Rib</TableCell>
              <TableCell>intérlocuteur</TableCell>
              <TableCell>fonction</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
          <TableCell>{row.pharmacie.denomination}</TableCell>
              <TableCell>{row.pharmacie.adresse}</TableCell>
              <TableCell>{row.pharmacie.tel}</TableCell>
              <TableCell>{row.pharmacie.gsm}</TableCell>
              <TableCell>{row.pharmacie.fax}</TableCell>
              <TableCell>{row.pharmacie.patente}</TableCell>
              <TableCell>{row.pharmacie.numRC}</TableCell>
              <TableCell>{row.pharmacie.rib}</TableCell>
              <TableCell>{row.pharmacie.interlocuteur}</TableCell>
              <TableCell>{row.pharmacie.fonction}</TableCell>
           
          </TableRow>
          </TableBody>
        </Table>
        <div style={{height:'20px'}}></div>
      <Divider variant="middle"  style={{backgroundColor:'#276955',width:'50%',marginLeft:'25%'}}/>
      <div style={{height:'20px'}}></div>

        <Table>
<TableHead>
<TableRow>
<TableCell>dateCreation</TableCell>
              <TableCell>Date Démarrage</TableCell>
              <TableCell>Banque</TableCell>
              <TableCell>Forme Juridique</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>villeRC</TableCell>
              <TableCell>Région</TableCell>

</TableRow>

</TableHead>
<TableBody>
<TableRow>   <TableCell>{row.pharmacie.dateCreation}</TableCell>
              <TableCell>{row.pharmacie.dateDemarrage}</TableCell>
              <TableCell>{row.pharmacie.banque}</TableCell>
              <TableCell>{row.pharmacie.formeJuridique}</TableCell>
              <TableCell>{row.pharmacie.ville}</TableCell>
              <TableCell>{row.pharmacie.villeRC}</TableCell>
              <TableCell>{row.pharmacie.region}</TableCell>

</TableRow>

</TableBody>

            </Table>
       </React.Fragment>
    );
  }
}
UserListConsult.defaultProps = {};

UserListConsult.propTypes = {
  row: PropTypes.object.isRequired,
};

export default compose(
withStyles(styles),
)(UserListConsult);
