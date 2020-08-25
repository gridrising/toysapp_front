import React, { useEffect } from 'react';
import {
  Grid, makeStyles, CircularProgress, Container,
} from '@material-ui/core';
import { connect } from 'react-redux';
import CardComponent from '../../components/CardComponent';
import { getToys } from '../../redux/action/actions';
import MultipleSelect from '../../components/MultipleSelectFilterComponent';

const useStyle = makeStyles(() => ({
  cards: {
    maxWidth: '80%',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
}));
const CatalogPage = (props) => {
  const { toys, isLoading, getToys } = props;
  const classes = useStyle();
  useEffect(() => {
    getToys();
  }, [getToys]);
  const typeOfFilters = {
    status: ['Top sales', 'New', 'Sale'],
    price: ['10$-20$', '5$-10$'],
  };
  return (
    (!isLoading) ? (
      <Grid container>
        <Grid item>
          <Grid container>
            <Grid item><MultipleSelect type="Status" filters={typeOfFilters.status} /></Grid>
            <Grid item><MultipleSelect type="Price" filters={typeOfFilters.price} /></Grid>
          </Grid>
        </Grid>
        <Grid item>
          <div className={classes.cardsContainer}>
            <Grid className={classes.cards} container justify="center" spacing={3}>
              {toys.map((toy) => (
                <Grid key={toy._id} item>
                  <CardComponent
                    id={toy._id}
                    title={toy.title}
                    imageURL={toy.imageUrl[0]}
                    description={toy.body}
                    price={toy.price}
                    status={toy.status.includes('Sale') ? 'Sale' : toy.status.includes('Top sales') ? 'Top sales' : toy.status.includes('New') ? 'New' : ''}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    ) : (<Container align="center"><CircularProgress /></Container>)

  );
};
const mapStateToProps = (state) => ({
  toys: state.toys,
  isLoading: state.isLoading,
});
const mapDispatchToProps = {
  getToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
