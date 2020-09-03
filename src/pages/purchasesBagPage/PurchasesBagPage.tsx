import React from 'react';
import TableBagComponent from '../../components/TableBagComponent';
import {
  Grid,
  Typography,
  Box,
  Button,
  makeStyles,
  Paper,
  Container,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { State, Toy } from '../../types/types';
import CheckoutComponent from '../../components/CheckoutComponent';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  contentContainer: {
    maxWidth: '95%',
    margin: 'auto',
  },
  gridCheckoutItem: {
    marginTop: '25px',
  },
  Link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

type Props = {
  purchases: Toy[];
};

const PurchasesBagPage = (props: Props) => {
  const classes = useStyles();
  const { purchases } = props;
  const fullPrice = +purchases
    .reduce((price, purchase) => price + purchase.price * purchase.amounts, 0)
    .toFixed(2);
  return purchases.length ? (
    <Grid container spacing={3} className={classes.contentContainer}>
      <Grid item xl={9} lg={9} md={8} sm={7} xs={12}>
        <Box m="10px">
          <Typography variant="h3">My bag</Typography>
        </Box>
        <TableBagComponent purchases={purchases}></TableBagComponent>
      </Grid>
      <Grid
        item
        xl={3}
        lg={3}
        md={4}
        sm={5}
        xs={12}
        className={classes.gridCheckoutItem}
      >
        <CheckoutComponent fullPrice={fullPrice}></CheckoutComponent>
      </Grid>
    </Grid>
  ) : (
    <Container>
      <Typography align="center" variant="h3">
        Your Bag is empty
      </Typography>
      <Box display="flex" m="15px" justifyContent="center">
        <Link className={classes.Link} to="/catalog">
          <Button variant="contained" color="primary" size="large">
            Go to catalog
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: State) => ({
  purchases: state.purchases,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesBagPage);
