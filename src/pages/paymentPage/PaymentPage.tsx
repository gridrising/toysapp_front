import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  Container,
} from '@material-ui/core';
import { Toy, State } from '../../types/types';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  checkoutBox: {
    maxWidth: '300px',
    margin: '30px 0',
    border: '1px solid #2222221a',
  },
  checkoutButton: {
    margin: '10px 0',
  },
  contentContainer: {
    maxWidth: '70%',
    margin: 'auto',
  },
}));

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HKlJzFOvl0Z3sAvQZhRUGSO48xKmj2yVQB3slEdpw1GMjT3EtmxoNJMUNLRVRomgjgCiaC9LsEQFeuObdQ7ZSSn00w7tldxtN'
);
type Props = {
  purchases: Toy[];
};

function PaymentPage(props: Props) {
  const { purchases } = props;
  const classes = useStyles();
  const fullPrice = purchases
    .reduce((price, purchase) => price + purchase.price * purchase.amounts, 0)
    .toFixed(2);
  return (
    <Elements stripe={stripePromise}>
      <Grid container spacing={5} className={classes.contentContainer}>
        <Grid item xl={9} lg={9} md={8} sm={7} xs={12}>
          <CheckoutForm />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={5} xs={12}>
          <Box className={classes.checkoutBox} m="30px">
            <Box m="30px">
              <Box mt="30px" maxWidth="300px">
                <Typography variant="h6" paragraph>
                  Order Summary
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box mr="10px">
                  <Typography variant="h5">Total</Typography>
                </Box>

                <Typography variant="h6">{`$${fullPrice}`}</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Elements>
  );
}
const mapStateToProps = (state: State) => ({
  purchases: state.purchases,
});

export default connect(mapStateToProps)(PaymentPage);
