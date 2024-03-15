import { pool } from '../db.js';

export const getCustomers = async (req, res) => {
  try {
    const [result] = await pool.query(
      'select C.id, C.f_name,C.last_name,C.email,CA.street,CA.city,CA.state,CA.country,CA.zip_code from customer_addresses CA join Customers C on CA.customer_id = C.id'
    );
    //console.log(result);
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
      `select * from Customers where id = ${id}`,
      []
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
    const { f_name, last_name, email, create_date } = req.body;
    const { customer_id, street, city, state, country, zip_code } = req.body;

    const [customerResult] = await pool.query(
      'insert into Customers(f_name,last_name,email,create_date) values(?,?,?,?)',
      [f_name, last_name, email, create_date ?? new Date()]
    );

    const [customerAddress] = await pool.query(
      'insert into customer_addresses(customer_id,street,city,state,country,zip_code) values(?,?,?,?,?,?)',
      [customerResult.insertId, street, city, state, country, zip_code]
    );

    //console.log(customerAddress);
    res.status(200).json({ message: 'address added', success: true });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: error, success: false });
  }
  return res.send();
};

export const updateCustomer = async (req, res) => {
  try {
    const [result] = await pool.query(`update Customer set ? where id = ?`, [
      req.body,
      req.params.id,
    ]);
    console.log(result);
    res.json(result);
    res.status(200).json({ message: 'Customer updated!', success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Customer not updated', success: false });
  }
  console.log(res);
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`Delete from Customers where id = ${id}`);
    console.log(result);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: 'Customer deleted', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};
