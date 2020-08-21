import React, { useEffect } from 'react';
import {
  Grid, makeStyles, Typography, Container, CircularProgress,
} from '@material-ui/core';
import { connect } from 'react-redux';
import CardComponent from '../../components/CardComponent';
import HomeBackground from '../../components/HomeBackground';

import { getToys } from '../../redux/action/actions';

const useStyle = makeStyles(() => ({
  cards: {
    maxWidth: '80%',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const HomePage = (props) => {
  const { toys, toysIsLoading, getToys } = props;
  const classes = useStyle();
  useEffect(() => {
    getToys();
  }, [getToys]);
  return toysIsLoading ? (
    <>
      <HomeBackground />
      <Container align="center"><CircularProgress /></Container>
    </>
  ) : (
    <>
      <HomeBackground />
      <Typography variant="h3" align="center" gutterBottom>
        Top sales
      </Typography>
      <div className={classes.cardsContainer}>
        <Grid className={classes.cards} container justify="center" spacing={3}>
          {toys.map((toy) => (toy.status.includes('Top sales') ? (
            <Grid key={toy._id} item>
              <CardComponent
                id={toy._id}
                title={toy.title}
                imageURL={toy.imageUrl}
                description={toy.body}
                price={toy.price}
                status="Top sales"
              />
            </Grid>
          ) : null))}
        </Grid>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  toys: state.toys,
  toysIsLoading: state.toysIsLoading,
});
const mapDispatchToProps = {
  getToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
