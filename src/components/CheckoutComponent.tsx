import React from 'react';
import { Typography, Box, Button, makeStyles, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  checkoutBox: {
    maxWidth: '300px',
    margin: '30px 0',
    border: '1px solid #2222221a',
  },
  checkoutButton: {
    margin: '10px 0',
  },
  Link: {
    textDecoration: 'none',
    color: 'white',
  },
}));

type Props = {
  fullPrice: Number;
};
const CheckoutComponent = (props: Props) => {
  const { fullPrice } = props;
  const classes = useStyles();
  return (
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
          <Box>
            <Typography variant="h6">{`$${fullPrice}`}</Typography>
          </Box>
        </Box>
        <Link className={classes.Link} to="/payment">
          <Button
            className={classes.checkoutButton}
            variant="contained"
            fullWidth
            size="large"
            color="primary"
          >
            Checkout
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CheckoutComponent;
