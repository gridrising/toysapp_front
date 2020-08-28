import React from 'react';
import { Grid, makeStyles, Box, Typography, Button } from '@material-ui/core';
import { Toy } from '../types/types';

const useStyles = makeStyles(() => ({
  toyImage: { maxWidth: '250px', margin: 'auto' },
  imgContainer: {
    maxWidth: '250px',
    margin: 'auto',
  },
  productContainer: {
    borderBottom: '1px solid #9E9E9E',
  },
  productComponent: {
    margin: '0 10px',
  },
}));

type Props = {
  purchases: Toy[];
};

const TableBagComponent = (props: Props) => {
  const classes = useStyles();
  const { purchases } = props;
  return (
    <Grid container>
      {purchases.map((purchase: Toy) => (
        <Grid
          container
          key={purchase._id}
          justify="space-between"
          className={classes.productContainer}
          alignContent="space-between"
        >
          <Grid item className={classes.productComponent} xs={5} xl={5}>
            <Grid container className={classes.productComponent}>
              <Grid item className={classes.imgContainer}>
                <img
                  className={classes.toyImage}
                  src={purchase.imageUrl[0]}
                  height="auto"
                ></img>
              </Grid>
              <Grid item className={classes.productComponent}>
                <Box maxWidth="100px">
                  <Typography variant="h6">{purchase.title}</Typography>
                </Box>
                <Typography variant="body1">{`Quantity ${purchase.amounts} at $${purchase.price}`}</Typography>
                <Button variant="contained" color="secondary">
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h5">{`$${
              purchase.amounts * purchase.price
            }`}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default TableBagComponent;
