import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArticleDetails from './articleDetailsDialog';
import DeleteIcon from '@material-ui/icons/Delete';
import userService from '../services/user.service';
import authService from '../services/auth.service';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    minHeight: 140,
    minWidth: 300
  },
});

const MocCard = (props) => {
    const history = useHistory();
    const classes = useStyles();
    const { idBudowli, tytul, opis, idAutora, date } = props.mocCard;

    function deleteMoc(){
      userService.deleteMoc(idBudowli);
    }

    function handleClickDetails() {
      history.push({ 
        pathname: '/MocDetails',
        state: {idBudowli}
       });
    }

    function handleClickEdit() {
      history.push({ 
        pathname: '/MocEdit',
        state: {idBudowli}
       });
    }

    return (
      <div>
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image= 'https://image.ceneostatic.pl/data/products/81881514/i-lego-31095-creator-karuzela-w-wesolym-miasteczku.jpg'
                title={tytul}
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                Autor: {idAutora}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" onClick={() => handleClickDetails()}>
                Czytaj więcej
            </Button>
            <Button size="small" color="primary" onClick={() => handleClickEdit()}>
                Edytuj
            </Button>
            {authService.getCurrentUserRole() == "Admin" ?(
                    <Button color="secondary" onClick={() => deleteMoc()}>
                    <DeleteIcon/>
                  </Button>
                  ):null 
                  }
        </CardActions>
        </Card>

          {/* <ArticleDetails title="Article Details" openPopup={open} onClose={() => setOpen(false)} param={props.article}>
          </ArticleDetails> */}
      </div>
        
  );
}

export default MocCard