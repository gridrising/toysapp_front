import React from 'react';
import TableBagComponent from '../../components/TableBagComponent';
import {
  Grid,
  Typography,
  Box,
  Button,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { State, Toy } from '../../types/types';
import CheckoutComponent from '../../components/CheckoutComponent';

const useStyles = makeStyles(() => ({
  contentContainer: {
    maxWidth: '95%',
    margin: 'auto',
  },
  gridCheckoutItem: {
    marginTop: '25px',
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
  return (
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
  );
};

const mapStateToProps = (state: State) => ({
  purchases: state.purchases,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesBagPage);
