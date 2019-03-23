import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const MembreMenu = ({ classes }) => {
  return (
    <div style={{flexGrow:1}}>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Offres
        </Button>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Mes Commandes
      </Button>
    </div>
  );
}

const AdminMenu = ({ classes }) => {
  return (
    <div style={{flexGrow:1}}>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Utilisateurs
        </Button>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Offres
        </Button>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Commandes
      </Button>
    </div>
  );
}

const SuperAdminMenu = ({ classes }) => {
  return (
    <div style={{flexGrow:1}}>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Utilisateurs
        </Button>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Référentiels
        </Button>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
          Offres
        </Button>
        <Button
          href="#"
          className={classes.button}
          classes={{ label: classes.label }}
        >
        Commandes
      </Button>
    </div>
  );
}

const MonMenu = (props) => {
  const classes = props.classes;
  const role = props.role;
  console.log(props);
  if(role === null){
    return <div style={{flexGrow:1}}></div>
  } else if (role === "ADMIN"){
    return <AdminMenu classes={classes}/>
  } else if (role === "SUPER_ADMIN") {
    return <SuperAdminMenu classes={classes}/>
  } else if (role === "MEMBRE") {
    return <MembreMenu classes={classes}/>
  }
  return null;
}

const styles = theme => ({
  label: {
    color: "white"
  },
  button: {
    marginLeft: "50px"
  }
});

export default withStyles(styles)(MonMenu);
