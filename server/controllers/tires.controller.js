import { pool } from '../db.js';

export const getTires = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT 
      T.id,
      T.tire_name,
      C.tire_company,
      S.tire_size,
      Sn.sn_name
      from Tires T
      inner join Companies C on T.company_id = C.id 
      inner join Sizes S on T.size_id = S.id 
      inner join Seasons Sn on T.sn_id = Sn.id
      
  `
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTire = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `select * from Tires where id = ${id}`
      //[req.params.id]
    );
    if (result.lenght === 0) {
      return res.status(404).json({ message: 'Tire not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

export const createTire = async (req, res) => {
  try {
    const { tire_name, Companies_id, Sizes_id, Seasons_id, tire_Img } =
      req.body;
    const [result] = await pool.query(
      'insert into Tires(tire_name,Companies_id,Sizes_id,Seasons_id) values(?,?,?,?)',
      [tire_name, Companies_id, Sizes_id, Seasons_id]
    );
    console.log(result);
    res.send('New Tire created');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTire = async (req, res) => {
  try {
    const { id } = req.params;
    const { tire_name } = req.body;
    const [result] = await pool.query(
      `update Tires set tire_name = '${tire_name}' where id = ${id}`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Tire updated ', success: true });
  }
  console.log(result);
};

export const deleteTire = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`DELETE FROM Tires WHERE id = ${id} `);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Tires deleted', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};
