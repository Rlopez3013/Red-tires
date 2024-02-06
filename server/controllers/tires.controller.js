import { pool } from '../db.js';

export const getTires = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select 
      T.id, 
      T.tire,
      C.company,
      S.size,
      I.path_img,
      Sn.season,
      TO_BASE64(I.path_img) as 'Images_id' 
      from Tires as T 
      inner join Companies C on T.Companies_id = C.id 
      inner join Sizes S on T.Sizes_id = S.id
      inner join Seasons Sn on T.Seasons_id = Sn.id
      inner join images I on T.Images_id = I.id
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
    const { tire, Companies_id, Sizes_id, Seasons_id, tire_Img } = req.body;
    const [result] = await pool.query(
      'insert into Tires(tire,Companies_id,Sizes_id,Seasons_id) values(?,?,?,?)',
      [tire, Companies_id, Sizes_id, Seasons_id]
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
    const { tire } = req.body;
    const [result] = await pool.query(
      `update Tires set tire = '${tire}' where id = ${id}`
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
