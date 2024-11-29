import { pool } from '../db.js';

export const getCustomerAddresses = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select 
      C.id AS customerId, 
      C.first_name,
      C.last_name,
      C.email,
      CA.number,
      CA.street,
      CA.city,
      CA.state,
      CA.country,
      CA.zip_code 
      from customers_address CA 
      join customers C on CA.customer_id = C.id
      ORDER BY C.first_name`
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: message.error });
  }
};

export const getCustomerAddress = async (req, res) => {
  try {
    const { customerId } = req.params;
    const [result] = await pool.query(
      `Select 
      C.id AS customerId, 
      C.first_name,
      C.last_name,
      C.email,
      CA.number,
      CA.street,
      CA.city,
      CA.state,
      CA.country,
      CA.zip_code 
      from customers_address CA 
      join customers C on CA.customer_id = C.id
      where C.id = ?
      ORDER BY C.first_name
      `,
      [customerId]
    );
    console.log(result);
    if (result.lenght === 0) {
      return res
        .status(404)
        .json({ message: 'customer with addres not found' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
