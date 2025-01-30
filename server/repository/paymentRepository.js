import { pool } from '../db.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Function to calculate order amount
const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
    console.log('Adding item amount:', item.amount, 'Total so far:', total);
  });
  return total;
};

// POST route to create a payment intent
export const createSession = async (req, res) => {
  try {
    if (!process.env.BASE_URL) {
      throw new Error('BASE_URL environment variable is not set.');
    }

    // Create line items separately for better readability
    const lineItems = req.body.items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    console.log('create session with', lineItems);

    // Create the checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    // Return the session URL
    //return { url: session.url };

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw new Error('Failed to create checkout session');
  }
};


