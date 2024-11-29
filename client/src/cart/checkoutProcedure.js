import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';  // Correct import

function CheckoutProcedureForm() {
  const stripe = useStripe();
  const elements = useElements();  // Correct usage of useElements
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Send the paymentMethod.id to backend to create a payment intent
      try {
        const response = await axios.post(
          'http://localhost:4000/api/create-payment-intent',
          { paymentMethodId: paymentMethod.id },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const paymentintentResponse = response.data;  // Access the response data
        const { clientSecret } = paymentintentResponse;

        // Confirm the card payment
        const { error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: paymentMethod.id }
        );
        
        if (confirmError) {
          setError(confirmError.message);
          setLoading(false);
        } else {
          alert('Payment Successful!');
          setLoading(false);
        }
      } catch (err) {
        setError('An error occurred during payment processing.');
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type='submit' disabled={loading || !stripe}>Pay</button>
      {loading ? 'Processing...' : 'Pay'}
    </form>
  );
}

export default CheckoutProcedureForm;

