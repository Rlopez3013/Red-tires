import { pool } from '../db.js';

export const getWheels = async (req, res) => {
  try {
    const [result] = await pool.query(
      `Select 
      Md.model_name,
      t.tire_name,
      t.id  as tireId, 
      Md.id as modelId,
      Sn.sn_name,
      z.tire_size,
     C.tire_company,
     C. id as companyId
     from Models_Tires L
      join Tires t on t.id = L.tire_Id
      join Companies C on C.id = t.company_id
      join Models Md on Md.id = L.model_id
      join Seasons Sn on Sn.id = t.sn_id
      join Sizes z on z.id = t.size_id`
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
    console.log(req.params.id);
    const [result] = await pool.query(`SELECT 
    t.id as tireId,
    t.tire_name,
    C.tire_company,
    Sn.sn_name,
    S.tire_size
     FROM Models_Tires L
     inner join Tires t on t.id = L.tire_Id
     inner join Companies C on C.id = t.company_id
     inner join Sizes S on S.id = t.size_id
     inner join Seasons Sn on Sn.id = t.sn_id
     where t.id = '${id}';`);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Wheel not found' });
    }
    console.log(result);
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};
