import { pool } from '../db.js';

export const getShoppers = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select
      S.id, 
      C.id as "customerId",
      C.first_name,
      C.last_name,
      M.model_name,
      T.tire_name
      from shoppers S 
      inner join customers C on S.Customer_id = C.id 
      inner join models M on S.model_id = M.id
      inner join tires T on S.Tire_id = T.id`
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
    console.log(req.params.id);
    const [result] = await pool.query(
      `Select 
      S.id,
      C.id as "customerId", 
      C.first_name,
      C.last_name,
      M.model_name,
      T.tire_name 
      from shoppers S 
      inner join customers C on S.Customer_id = C.id 
      inner join models M on S.model_id = M.id
      inner join tires T on S.Tire_id = T.id 
      where S.id = ${id}`
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
    const { customer_id, tire_id } = req.body;

    const [result] = await pool.query(
      'insert into shoppers(customer_id, tire_id) values(?,?)',
      [customer_id, tire_id]
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error.message' });
  }
};

export const updateShopper = async (req, res) => {
  try {
    const [result] = await pool.query(`update shoppers set ? where id = ? `, [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'shopper updated!', success: true });
  }
  console.log(res);
};

export const deleteShopper = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`Delete from shoppers where id = ${id}`);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: 'Shopper deleted !', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};
