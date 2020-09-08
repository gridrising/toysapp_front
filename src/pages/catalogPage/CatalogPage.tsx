import React, { useEffect, useState } from 'react';
import {
  Grid,
  makeStyles,
  CircularProgress,
  Container,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import CardComponent from '../../components/CardComponent';
import { getToys } from '../../redux/action/actions';
import MultipleSelect from '../../components/MultipleSelectFilterComponent';
import { Toys, Toy, State } from '../../types/types';

const useStyle = makeStyles(() => ({
  cards: {
    maxWidth: '80%',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  filters: {
    maxWidth: '70%',
    margin: 'auto',
  },
  progressContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
  },
}));

type Props = {
  toys: [];
  isLoading: boolean;
  getToys: () => void;
  currentFilters: {
    Status: string[];
    Price: string[];
  };
};

const CatalogPage = (props: Props) => {
  const { toys, isLoading, getToys, currentFilters } = props;
  const classes = useStyle();
  const [filterIsEmpty, setFilterIsEmpty] = useState(true);
  const [finalFilter, setFinalFilter] = useState([]);
  useEffect(() => {
    getToys();
  }, [getToys]);
  useEffect(() => {
    const byStatusToys = toys.filter((toy: Toy) =>
      currentFilters.Status?.some((oneFilter) => toy.status.includes(oneFilter))
    );
    const byPriceToys = toys.filter((toy: Toy) => {
      return currentFilters.Price?.some((oneFilter) => {
        return (
          toy.price >= +oneFilter.split('-')?.[0] &&
          toy.price <= +oneFilter.split('-')?.[1]
        );
      });
    });
    const allFilters = [byStatusToys, byPriceToys];
    const crossingFilter = toys.filter((toy: never) =>
      allFilters.every((oneFiltered) =>
        oneFiltered.length ? oneFiltered.includes(toy) : true
      )
    );
    setFinalFilter(crossingFilter);
    setFilterIsEmpty(byPriceToys.length === 0 && byStatusToys.length === 0);
  }, [currentFilters]);
  const typeOfFilters = {
    status: ['Top sales', 'Sale', 'New'],
    price: ['5-10', '10-20', '20-30'],
  };
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container className={classes.filters}>
          <Grid item>
            <MultipleSelect type="Status" filters={typeOfFilters.status} />
          </Grid>
          <Grid item>
            <MultipleSelect type="Price" filters={typeOfFilters.price} />
          </Grid>
        </Grid>
      </Grid>
      {!isLoading ? (
        <Grid item xs={12}>
          <div className={classes.cardsContainer}>
            <Grid
              className={classes.cards}
              container
              justify="center"
              spacing={3}
            >
              {filterIsEmpty ? (
                toys.map((toy: Toy) => (
                  <Grid key={toy._id} item>
                    <CardComponent
                      id={toy._id}
                      title={toy.title}
                      avatar={toy.avatar}
                      description={toy.body}
                      price={toy.price}
                      status={toy.status}
                    />
                  </Grid>
                ))
              ) : finalFilter.length !== 0 ? (
                finalFilter.map((toy: Toy) => (
                  <Grid key={toy._id} item>
                    <CardComponent
                      id={toy._id}
                      title={toy.title}
                      avatar={toy.avatar}
                      description={toy.body}
                      price={toy.price}
                      status={toy.status}
                    />
                  </Grid>
                ))
              ) : (
                <Typography>No such products :(</Typography>
              )}
            </Grid>
          </div>
        </Grid>
      ) : (
        <Container className={classes.progressContainer}>
          <CircularProgress />
        </Container>
      )}
    </Grid>
  );
};
const mapStateToProps = (state: State) => ({
  toys: state.toys,
  isLoading: state.isLoading,
  currentFilters: state.currentFilters,
});
const mapDispatchToProps = {
  getToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
