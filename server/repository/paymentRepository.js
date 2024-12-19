import { pool } from '../db.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// export const createSession = async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             name: 'tire',
//             description: 'car tire',
//           },
//           currency: 'usd',
//           unit_amount: 20000, //200.00
//         },
//         quantity: 1
//       },
//     ],
//     mode: 'payment',
//     success_url: 'http://localhost:3000/success',
//     cancel_url: 'http://localhost:3000/cancel',
//   });
//   return res.json(session)
// };

export const createSession = async (req, res) => {
  try {
    const { amount, payment_intent_id, currency, description } = req.body;
    const [result] = await pool.query(
      'Insert into payments(payment_intent_id,amount,currency,description) VALUES(?,?,?,?)',
      [payment_intent_id, amount, currency, description]
    );
    console.log(result);
    res.send('Payment received');
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
