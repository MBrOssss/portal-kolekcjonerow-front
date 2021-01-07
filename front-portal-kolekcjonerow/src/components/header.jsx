import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AuthService from '../services/auth.service';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const user = AuthService.getCurrentUser();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" href="/">MainPage</Button>
          <Button color="inherit" href="/Oferty">Offerts</Button>
          <Button color="inherit" href="/Mocs">MOC</Button>
          {user ? (
            <Button color="inherit" onClick={ () => AuthService.logout()} href="/" >Wyloguj</Button>
          ):(
            <div>
              <Button color="inherit" href="/Login">Login</Button>
              <Button color="inherit" onClick={ () => alert("ludzie, nikogo tu nie ma :c")}>Register</Button>
            </div>
          )
          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}