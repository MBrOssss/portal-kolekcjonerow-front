import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Button from '@material-ui/core/Button'
import { CardActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import OffertDetails from '../components/offertDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '2 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const OffertCard = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const { idOferty, tytul, opis, idSprzedawcy, idKupujacego, imageName, status } = props.offert;

    function deleteOffert(){
      userService.deleteOferta(idOferty);
    }

    function handleClickDetails() {
      history.push({ 
        pathname: '/OffertDetails',
        state: {idOferty}
       });
    }

    function handleClickEdit() {
      history.push({ 
        pathname: '/OffertEdit',
        state: {idOferty}
       });
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image='https://pwimages-a.akamaihd.net/arc/ee/dc/eedc9377b8c7b9f9ece59809a68a40b51591989268.jpg'
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {tytul}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {opis}
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleClickDetails()}>
                    Szczegóły
                  </Button>
                  <Button size="small" color="primary" onClick={() => handleClickEdit()}>
                    Edytuj
                  </Button>
                  {authService.getCurrentUserRole() == "Admin" ?(
                    <Button color="secondary" onClick={() => deleteOffert()}>
                    <DeleteIcon/>
                  </Button>
                  ):null 
                  }
                  
                </CardActions>
                
                    
                {/* <div className={classes.controls}>
                <IconButton aria-label="previous">
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                    <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="next">
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
                </div> */}
            </div>
        
        </Card>
  );
}

export default OffertCard