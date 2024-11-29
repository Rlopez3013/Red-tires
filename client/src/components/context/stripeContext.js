import React,{useState} from "react";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../shoppers/checkOutForm";



// your publichable key from stripe
const stripePromise = loadStripe(
    'pk_test_51QO3StJ13o3FLYTti4tsK4OfOnHT9gdfNistOg9vj1fYNXkoFs9rCAhFViQF3wqntyE4lxzWPINvrQtHPws3HCkH00POgEgDZZ'
  );

function Stripe() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default Stripe;