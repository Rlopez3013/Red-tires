import { pool } from '../db.js';

export const getWheels = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select 
      Md.model as model,
      Md.id as modelId,
      t.tire as tire,
      t.id  as tireId, 
      Sn.season as season,
      z.size as size,
     C.company as company,
     C. id as companyId
     from Models_Tires L
      join Tires t on t.id = L.Tires_id
      join Companies C on C.id = t.Companies_id
      join Models Md on Md.id = L.Models_id
      join Seasons Sn on Sn.id = t.Seasons_id
      join Sizes z on z.id = t.Sizes_id`
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getWheel = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`SELECT 
    tire,
    modelId,
    company,
    model,
    type,
    size,
    year
     FROM Modelos_Gomas
     where modelId = ${id};`);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Wheel not found' });
    }
    console.log(result);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};
