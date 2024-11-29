import { pool } from '../db.js';

export const getAllCheckouts = async (req, res) => {
  try {
    const [result] = await pool.query('select * from checkout');
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCheckout = async (req, res) => {
  try {
    const { checkout_id } = req.params;
    const [result] = await pool.query(
      `Select * from checkout where checkout_id = ${checkout_id}`
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'checkout not found' });
    }
    res.json(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const createCheckout = async (req, res) => {
  try {
    const {
      order_id,
      payment_method,
      payment_status,
      shipping_address,
      shipping_method,
      shipping_cost,
    } = req.body;
    const [result] = await pool.query(
      'insert into checkout(order_id,payment_method, payment_status,shipping_address, shipping_method,shipping_cost) values (?,?,?,?,?,?)',
      [
        order_id,
        payment_method,
        payment_status,
        shipping_address,
        shipping_method,
        shipping_cost,
      ]
    );
    console.log(result);
    res.send('New order create');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCheckout = async (req, res) => {
  try {
    const [result] = await pool.query(
      `update checkout set ? where checkout_id = ?`,
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'checkout updated', success: true });
  }
  console.log(res);
};

export const deleteCheckout = async (req, res) => {
  try {
    const { checkout_id } = req.params;
    const [result] = await pool.query(
      `Delete from checkout where checkout_id = ${checkout_id}`
    );
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: 'checkout deleted', success: true });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, success: false });
  }
};
