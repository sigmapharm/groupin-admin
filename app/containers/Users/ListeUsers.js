import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { compose } from 'redux';
import Divider from '@material-ui/core/Divider';
import Toggle from '../../components/Toggle/Toggle';
import authenticated from '../HOC/authenticated/authenticated';

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: '10%',
  },
  table: {
    minWidth: 700,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

let id = 0;
function createData(nom, email, pharmacie, role) {
  id += 1;
  return { id, nom, email, pharmacie, role };
}

const rows = [
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
  createData(
    'Mekran Mohamed',
    'momo@gmail.com',
    'Agdal - Rabat',
    'Super Admin',
  ),
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Nom et prénomn</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Pharmacie</TableCell>
            <TableCell>Rôle</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <TableCell component="th" scope="row">
                {row.nom}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.pharmacie}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                <EditButton classes={classes} />
                <Toggle />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function EditButton(props) {
  const { classes } = props;
  return (
    <Fab color="primary" size="small" aria-label="Edit" className={classes.fab}>
      <EditIcon />
    </Fab>
  );
}

function ListeUsers(props) {
  const { classes } = props;
  return (
    <div>
      <Typography component="h1" variant="h4" className={classes.root}>
        Liste des utilisateurs
      </Typography>
      <Divider variant="middle" className={classes.root} />
      <CustomizedTable classes={classes} />
    </div>
  );
}

ListeUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

EditButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  authenticated,
  withStyles(styles),
)(ListeUsers);
