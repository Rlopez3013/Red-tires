import { pool } from '../db.js';

// Payment endpoint to create a payment intent
export const createPayment = async (req, res) => {
  try {
    const { paymentIntentId, amount } = req.body;
    const [result] = await pool.query(
      'Insert into transactions (payment_id, amount) values(?,?)'[
        (paymentIntentId, amount)
      ]
    );
    console.log(result);
    res.send('New payment created!!!');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
