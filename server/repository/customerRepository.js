import { pool } from '../db.js';

export const getCustomers = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select 
      C.id, 
      C.first_name,
      C.last_name,
      C.email,
      CA.number,
      CA.street,
      CA.city,
      CA.state,
      CA.country,
      CA.zip_code 
      from Customers_address CA 
      join Customers C on CA.customer_id = C.id`
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `select * from Customers where id = ${id}`
      //[]
    );
    if (result.length === 0) {
      return res.status(500).json({ message: 'Customer not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

export const createCustomer = async (req, res) => {
  try {
    console.log('creating customer');
    const { first_name, last_name, email } = req.body;
    const { customer_id, number, street, city, state, country, zip_code } =
      req.body;

    const [customerResult] = await pool.query(
      'insert into Customers(first_name,last_name,email) values(?,?,?)',
      [first_name, last_name, email]
    );

    const [customerAddress] = await pool.query(
      'insert into Customers_address(customer_id,number,street,city,state,country,zip_code) values(?,?,?,?,?,?,?)',
      [customerResult.insertId, number, street, city, state, country, zip_code]
    );

    console.log(customerAddress);
    res.status(200).json({ message: 'address added', success: true });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: error, success: false });
  }
  return res.send();
};

export const deleteCustomer = async (req, res) => {
  try {
    const [result] = await pool.query(`Delete from Customers where id = ?`, [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: 'Customer deleted', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const [result] = await pool.query(`update Customers set ? where id = ?`, [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Customer updated', success: true });
  }
  console.log(res);
};
