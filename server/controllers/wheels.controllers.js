import { pool } from '../db.js';

export const getWheels = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select T.tire as tire, 
      Sn.season as season,
     S.size as size, 
     C.company as company,
     from Models_Tires L
     inner join Tires t on T.id = L.Tires_id
     inner join Companies C on C.id = Companies_id
     inner join Seasons Sn on Sn.id = Seasons_id`
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
