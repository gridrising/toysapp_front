import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardSection from '../../components/cardSection/CardSection';
import CheckoutForm from '../../components/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HKlJzFOvl0Z3sAvQZhRUGSO48xKmj2yVQB3slEdpw1GMjT3EtmxoNJMUNLRVRomgjgCiaC9LsEQFeuObdQ7ZSSn00w7tldxtN'
);

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentPage;
