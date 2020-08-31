/**
 * Use the CSS tab above to style your Element's container.
 */
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import './CardSectionStyles.css';
import { Typography, Box } from '@material-ui/core';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function CardSection() {
  return (
    <label>
      <Typography variant="h6" paragraph>
        Card details
      </Typography>
      <Box m="15px 0" maxWidth="500px">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </Box>
    </label>
  );
}

export default CardSection;
