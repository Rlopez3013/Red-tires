import { pool } from '../db.js';

export const getShoppers = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select
            Md.id as modelId,
            Md.model_name,
            t.tire_name,
            t.id as tireId,
            cs.id as customerId,
            cs.first_name,
            cs.last_name,
            s.Qty 
            from shoppers as s
            join models as Md on Md.id = s.model_id
            join tires as t on t.id = s.tire_id
            join customers as cs on cs.id = s.customer_id 
            ORDER BY cs.first_name`
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getShopper = async (req, res) => {
  try {
    const { customer_id, model_id, tire_id } = req.params;

    console.log(customer_id);
    const [result] = await pool.query(
      `select 
            t.id as tireId,
            Md.id as modelId,
            Md.model_name,
            t.tire_name,
            cs.id as customerId,
            cs.first_name,
            cs.last_name,
            s.Qty
            from shoppers s
            join models Md on Md.id = s.model_id
            join tires t on t.id = s.tire_id
            join customers cs on cs.id = s.customer_id
            where cs.id = ${customer_id}
            `
    );
    if (result.length === 0) {
      return res.status(404).json({ message: 'buyer not found' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createShopper = async (req, res) => {
  try {
    const { customer_id } = req.body;
    const { model_id } = req.body;
    const { tire_id } = req.body;
    const { Qty } = req.body;
    const [result] = await pool.query(
      'insert into shoppers(customer_id,model_id,tire_id,Qty) values(?,?,?,?)',
      [customer_id, model_id, tire_id, Qty]
    );
    console.log(result);
    res.send('New shopper created!!');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateShopper = async (req, res) => {
  try {
    const { modelId, customerId, tireId } = req.params;
    const { model_id, customer_id, tire_id, Qty } = req.body;

    const result = await pool.query(
      'update shoppers set model_id = ? tire_id = ? customer_id = ? Qty = ?',
      [model_id, tire_id, customer_id, Qty, modelId, customerId, tireId]
    );
    res.json(result);
    console.log(result);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteShopper = async (req, res) => {
  try {
    const { model_id, tire_id, customer_id } = req.body;
    const [result] = await pool.query(
      `delete from shoppers where model_id = ? tire_id = ? customer_id = ?`,
      [model_id, tire_id, customer_id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'shopper not found' });

    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
