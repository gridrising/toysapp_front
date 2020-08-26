import React, { useEffect, useState } from 'react';
import {
  Grid, makeStyles, CircularProgress, Container, Typography,
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
  filters:{
    maxWidth:"70%",
    margin:"auto",
  }
}));
const CatalogPage = (props) => {
  const { toys, isLoading, getToys,currentFilters } = props;
  const classes = useStyle();
  const [filterIsEmpty, setFilterIsEmpty] = useState(true);
  const [finalFilter, setFinalFilter] = useState([]);
  useEffect(() => {
    getToys();
  }, [getToys]);
  useEffect(() =>{
    const byStatusToys = toys.filter((toy) => currentFilters.Status?.some((oneFilter) => toy.status.includes(oneFilter)));
    const byPriceToys = toys.filter((toy) => {
      return currentFilters.Price?.some((oneFilter) => {
        return (toy.price >= +oneFilter.split("-")?.[0]) && (toy.price <= +oneFilter.split("-")?.[1])
    })});
    const allFilters = [byStatusToys, byPriceToys];
    setFinalFilter(toys.filter((toy) => allFilters.every((oneFiltered) => oneFiltered.length ?oneFiltered.includes(toy): true)))
    setFilterIsEmpty((byPriceToys.length === 0) && (byStatusToys.length === 0));
  },[currentFilters])
  const typeOfFilters = {
    status: ['Top sales','Sale','New'],
    price: ['5-10','10-20','20-30'],
  }
  return (
    <Grid container direction="column">
        <Grid item>
          <Grid container className={classes.filters} maxWidth="70%" m="auto">
            <Grid item><MultipleSelect type="Status" filters={typeOfFilters.status} /></Grid>
            <Grid item><MultipleSelect type="Price" filters={typeOfFilters.price} /></Grid>
          </Grid>
        </Grid>{
      (!isLoading) ? (
        <Grid item xs={12}>
          <div className={classes.cardsContainer}>
            <Grid className={classes.cards} container justify="center" spacing={3}>
              {filterIsEmpty ?(
                toys.map((toy) => (
                <Grid key={toy._id} item>
                  <CardComponent
                    id={toy._id}
                    title={toy.title}
                    imageURL={toy.imageUrl[0]}
                    description={toy.body}
                    price={toy.price}
                    status={toy.status}
                  />
                </Grid>))) : finalFilter.length !== 0 ?
               finalFilter.map((toy) => (
                <Grid key={toy._id} item>
                  <CardComponent
                    id={toy._id}
                    title={toy.title}
                    imageURL={toy.imageUrl[0]}
                    description={toy.body}
                    price={toy.price}
                    status={toy.status}
                  />
                </Grid>
              )):<Typography>No such products :(</Typography>}
            </Grid>
          </div>
        </Grid>
        ) : (<Container align="center"><CircularProgress /></Container>)}
      </Grid>

  );
};
const mapStateToProps = (state) => ({
  toys: state.toys,
  isLoading: state.isLoading,
  currentFilters:state.currentFilters,
});
const mapDispatchToProps = {
  getToys,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
