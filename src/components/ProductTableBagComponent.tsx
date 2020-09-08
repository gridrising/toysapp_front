import React from 'react';
import { Grid, Box, Button, Typography, makeStyles } from '@material-ui/core';
import { removePurchase } from '../redux/action/actions';
import { connect } from 'react-redux';
import { DispatchType, State } from '../types/types';

const useStyles = makeStyles((theme) => ({
  toyImage: { maxWidth: '100%', margin: 'auto' },
  imgContainer: {
    maxWidth: '250px',
    margin: 'auto',
  },
  productContainer: {
    borderTop: '1px solid #2222221a',
  },
  productComponent: {
    margin: '0 10px',
  },
  fullPrice: {
    margin: '20px',
  },
  toyName: {
    display: '-webkit-box',
    lineClamp: 4,
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
}));

type Props = {
  price: number;
  amounts: number;
  title: string;
  _id: string;
  avatar: string;
  removePurchase: (_id: string) => DispatchType;
};

const ProductTableBagComponent = (props: Props) => {
  const classes = useStyles();
  const { price, amounts, title, _id, avatar, removePurchase } = props;
  const handleClick = () => {
    removePurchase(_id);
  };
  return (
    <Grid
      container
      key={_id}
      justify="space-between"
      className={classes.productContainer}
      alignContent="space-between"
    >
      <Grid item className={classes.productComponent} xs={5} xl={5}>
        <Grid container className={classes.productComponent}>
          <Grid
            item
            className={classes.imgContainer}
            xl={5}
            lg={5}
            md={7}
            sm={12}
            xs={12}
          >
            <img
              className={classes.toyImage}
              src={avatar}
              height="auto"
              width="auto"
            ></img>
          </Grid>
          <Grid
            item
            className={classes.productComponent}
            xl={6}
            lg={6}
            md={5}
            sm={12}
            xs={12}
          >
            <Box maxWidth="150px" m="10px 0" className={classes.toyName}>
              <Typography variant="h6">{title}</Typography>
            </Box>
            <Box m="10px 0">
              <Typography variant="body1">{`Quantity ${amounts} at $${price}`}</Typography>
            </Box>
            <Box m="10px 0">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.fullPrice}>
        <Typography variant="h5">{`$${price * amounts}`}</Typography>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: State) => ({});
const mapDispatchToProps = {
  removePurchase,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTableBagComponent);
