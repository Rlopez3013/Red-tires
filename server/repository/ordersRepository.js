import { pool } from '../db.js';

export const getOrders = async (req, res) => {
  try {
    const [result] = await pool.query(
      `select 
            O.order_id,
            sh.customer_id as customerId,
            O.order_date,
            O.subtotal,
            sh.Qty,
            O.total
            from orders O  
            JOIN shoppers sh ON O.customer_id = sh.customer_id
            `
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const [result] = await pool.query(`select 
            O.order_id, 
            sh.customer_id as customerId, 
            O.order_date, 
            sh.Qty,
            O.total
            from orders O 
            JOIN
              shoppers sh on O.customer_id = sh.customer_id
              where O.order_id = ${order_id}
            `);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    console.log(result);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customer_id, status, total_price } = req.params;
    const [result] = await pool.query(
      'insert into orders(customer_id,total_price) values (?,?,?,?)',
      [customer_id, status, total_price]
    );
    console.log(result);
    res.send('New order create!!');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
