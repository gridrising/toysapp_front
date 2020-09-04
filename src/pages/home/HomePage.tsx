import React, { useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Container,
  CircularProgress,
  SvgIcon,
} from '@material-ui/core';
import { connect } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CardComponent from '../../components/CardComponent';
import HomeBackground from '../../components/HomeBackground';
import { getToys } from '../../redux/action/actions';
import { Toy, State } from '../../types/types';

const useStyle = makeStyles((theme) => ({
  cards: {
    maxWidth: '80%',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  headingArrowPositioning: {
    position: 'absolute',
    maxWidth: '100%',
    margin: 'auto',
    height: '100vh',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headingText: {
    color: 'white',
    opacity: '55%',
    [theme.breakpoints.up('md')]: {
      fontSize: '120px',
    },
  },
  arrowDown: {
    marginTop: '150px',
    fontSize: '70px',
  },
  linkArrowDown: {
    textDecoration: 'none',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
  },
}));

type Props = {
  toys: Toy[];
  toysIsLoading: boolean;
  getToys: () => void;
};

const HomePage = (props: Props) => {
  const { toys, toysIsLoading, getToys } = props;
  const classes = useStyle();
  useEffect(() => {
    getToys();
  }, [getToys]);
  return toysIsLoading ? (
    <>
      <Typography className={classes.headingText} variant="h2" align="center">
        TOYS SHOP
      </Typography>
      <HomeBackground />
      <Container className={classes.progressContainer}>
        <CircularProgress />
      </Container>
    </>
  ) : (
    <>
      <Container className={classes.headingArrowPositioning}>
        <Typography className={classes.headingText} variant="h2" align="center">
          TOYS SHOP
        </Typography>

        <a href="#cardsContainer" className={classes.linkArrowDown}>
          <span>
            <SvgIcon className={classes.arrowDown}>
              <KeyboardArrowDownIcon />
            </SvgIcon>
          </span>
        </a>
      </Container>

      <HomeBackground />
      <Typography variant="h3" align="center" gutterBottom id="cardsContainer">
        Top sales
      </Typography>

      <div className={classes.cardsContainer}>
        <Grid className={classes.cards} container justify="center" spacing={3}>
          {toys.map((toy) =>
            toy.status.includes('Top sales') ? (
              <Grid key={toy._id} item>
                <CardComponent
                  id={toy._id}
                  title={toy.title}
                  avatar={toy.avatar}
                  description={toy.body}
                  price={toy.price}
                  status={['Top sales']}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      </div>
    </>
  );
};
const mapStateToProps = (state: State) => ({
  toys: state.toys,
  toysIsLoading: state.toysIsLoading,
});
const mapDispatchToProps = {
  getToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
