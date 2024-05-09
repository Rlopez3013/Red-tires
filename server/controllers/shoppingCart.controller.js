import { pool } from '../db.js';

export const getShoppers = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select
      SC.id, 
      C.id as "customerId",
      C.f_name,
      C.last_name,
      M.model,
      T.tire,
      Quantity 
      from Shopping_Cart SC 
      inner join Customers C on SC.Customer_id = C.id 
      inner join Models M on SC.model_id = M.id
      inner join Tires T on SC.Tire_id = T.id`
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getShopper = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `Select 
      SC.id,
      C.id as "customerId", 
      C.f_name,
      C.last_name,
      M.model,
      T.tire,
      Quantity 
      from Shopping_Cart SC 
      inner join Customers C on SC.Customer_id = C.id 
      inner join Models M on SC.model_id = M.id
      inner join Tires T on SC.Tire_id = T.id 
      where SC.id = ${id}`
    );
    if (result.length === 0) {
      return res.status(404).json({ message: 'shopper not found' });
    }
    console.log(result);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
    // console.log(error);
  }
};

export const createShopper = async (req, res) => {
  try {
    const { Customer_id, Tire_id, Quantity } = req.body;

    const [result] = await pool.query(
      'insert into Shopping_Cart(Customer_id, Tire_id, Quantity) values(?,?,?)',
      [Customer_id, Tire_id, Quantity]
    );
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
    console.log(error);
  }
};

export const updateShopper = async (req, res) => {
  try {
    const [result] = await pool.query(
      `update Shopping_Cart set ? where id = ? `,
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'shopper updated!', success: true });
  }
  console.log(res);
};

export const deleteShopper = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `Delete from Shopping_Cart where id = ${id}`
    );
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: 'Shopper deleted !', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};
