import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

// import {
//   loadStripe,
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false); // Track loading state
  const [errorMessage, setErrorMessage] = useState(null); // Track error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // If stripe or elements are not ready, do nothing
    }

    setLoading(true); // Start loading

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message); // Set the error message if Stripe payment fails
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/payment', {
        id: paymentMethod.id, // Use payment method ID
      });

      console.log(response.data); // Handle the response
    } catch (error) {
      console.log(
        'Error buying tire',
        error.response ? error.response.data : error.message
      );
      setErrorMessage('Payment failed. Please try again.'); // Show a generic error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}{' '}
      {/* Display error messages */}
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

function PaymentProcedure() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentProcedure;
