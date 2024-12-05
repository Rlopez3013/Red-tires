import { pool } from '../db.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import express from 'express';



dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

export const createPayment = async (req, res) => {
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

//  export const createPayment = async (req, res) => {
//   const {id, currency} = req.body
//  const payment =   await stripe.paymentIntents.create({
//     currency: 'usd',
//     description: 'tires',
//     payment_method: id,
//     confirm: true

//   })
//   console.log(payment)
//   res.send({message: "Payment accepted"})
// });

// module.exports = router;
