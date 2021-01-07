import React from 'react';
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

const ArticleCard = (props) => {
    const classes = useStyles();
    const { idArtykulu, tytul, opis, idAutora } = props.article;
    const [open, setOpen] = React.useState(false);

    var opisCut = opis.substring(0, 200) + "...";

    function deleteArticle(){
      userService.deleteArtykul(idArtykulu);
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
            <Typography gutterBottom component="h2">
                {tytul}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {opisCut}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary" onClick={() => setOpen(true)}>
                Czytaj więcej
            </Button>
            {authService.getCurrentUserRole() == "Admin" ?(
                    <Button color="secondary" onClick={() => deleteArticle()}>
                    <DeleteIcon/>
                  </Button>
                  ):null 
                  }
        </CardActions>
        </Card>

          <ArticleDetails title="Article Details" openPopup={open} onClose={() => setOpen(false)} param={props.article}>
          </ArticleDetails>
      </div>
        
  );
}

export default ArticleCard