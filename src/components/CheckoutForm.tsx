import React, { FormEvent } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './cardSection/CardSection';
import { StripeCardElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import { State } from '../types/types';
import { Toy } from '../redux/reducers/reducer';
import axios from 'axios';
import { Button } from '@material-ui/core';

type Props = {
  purchases: Toy[];
};

function CheckoutForm(props: Props) {
  const { purchases } = props;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();

    const fullPrice = purchases
      .reduce((price, purchase) => price + purchase.price * purchase.amounts, 0)
      .toFixed(2);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const response = await axios.post('http://localhost:3000/secret', {
      fullPrice,
    });

    const { client_secret: client_secret } = response.data;

    const result: any = await stripe.confirmCardPayment(`${client_secret}`, {
      payment_method: {
        card: elements.getElement(CardElement) as
          | StripeCardElement
          | StripeCardNumberElement
          | { token: string },
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      } else {
        console.log('undefined');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <Button
        type="submit"
        disabled={!stripe}
        variant="contained"
        color="primary"
      >
        Confirm
      </Button>
    </form>
  );
}

const mapStateToProps = (state: State) => ({
  purchases: state.purchases,
});

export default connect(mapStateToProps)(CheckoutForm);
