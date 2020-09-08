import React, { FormEvent, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './cardSection/CardSection';
import { StripeCardElement, StripeCardNumberElement } from '@stripe/stripe-js';
import { connect } from 'react-redux';
import { State } from '../types/types';
import { Toy } from '../redux/reducers/reducer';
import axios from 'axios';
import { Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';
import { paymentIsSucceeded } from '../redux/action/actions';

type Props = {
  purchases: Toy[];
  paymentIsSucceeded: (array: Toy[]) => Promise<void>;
};

function CheckoutForm(props: Props) {
  const { purchases, paymentIsSucceeded } = props;
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();
    setIsLoading(true);

    const fullPrice = purchases
      .reduce((price, purchase) => price + purchase.price * purchase.amounts, 0)
      .toFixed(2);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADRESS}secret`,
      {
        fullPrice,
      }
    );

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
      setErrorMsg(result.error.message);
      setIsLoading(false);
      setTimeout(() => {
        setErrorMsg(null);
      }, 5000);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        setIsSucceeded(true);
        setIsLoading(false);
        localStorage.removeItem('bag');
        paymentIsSucceeded(purchases);
        setTimeout(() => {
          setIsSucceeded(false);
        }, 5000);

        console.log('Succeeded');
      } else {
        setIsLoading(false);
        console.log('undefined');
      }
    }
  };

  if (!localStorage.getItem('bag')) return <Redirect to="/catalog"></Redirect>;
  return (
    <>
      <form onSubmit={handleSubmit}>
        {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
        {isSucceeded ? <Alert>Payment succeeded</Alert> : null}
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
      {isLoading ? <CircularProgress></CircularProgress> : null}
    </>
  );
}

const mapStateToProps = (state: State) => ({
  purchases: state.purchases,
});
const mapDispatchToProps = {
  paymentIsSucceeded,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
