import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import StatusMarker from './StatusMarker';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: ' 0 15px',
  },
  cardLink: {
    textDecoration: 'none',
  },
  statusButton: {
    maxWidth: '50px',
    margin: '5px 0',
    position: 'absolute',
    top: '10px',
    right: '0px',
    borderRadius: '0',
  },
  cardText: {
    overflow: 'hidden',
    height: '60px',
  },
});

type Props = {
  id: string;
  title: string;
  imageURL: string;
  description: string;
  price: Number;
  status: string[];
};

function CardComponent(props: Props) {
  const classes = useStyles();
  const { id, title, imageURL, description, price, status } = props;
  return (
    <Link to={`/toypage/${id}`} className={classes.cardLink}>
      <Card className={classes.root}>
        <CardActionArea>
          <StatusMarker card={true} status={status} />
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="325"
            image={imageURL}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              className={classes.cardText}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {title}
            </Typography>

            <Typography
              className={classes.cardText}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardAction}>
          <Typography gutterBottom variant="h6" component="h2">
            {`${price}$`}
          </Typography>
          <Button size="large" color="primary" variant="contained">
            Buy
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
export default CardComponent;
