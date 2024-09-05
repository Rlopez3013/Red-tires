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
     from models_tires L
      join tires t on t.id = L.tire_Id
      join companies C on C.id = t.company_id
      join models Md on Md.id = L.model_id
      join seasons Sn on Sn.id = t.sn_id
      join sizes z on z.id = t.size_id`
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
     FROM models_tires L
     inner join tires t on t.id = L.tire_Id
     inner join companies C on C.id = t.company_id
     inner join sizes S on S.id = t.size_id
     inner join seasons Sn on Sn.id = t.sn_id
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
