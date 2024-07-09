import { pool } from '../../db.js';

export const getModelsAsync = async () => {
  let models = await pool.query(
    'select Mk.id as "makerId",Mk.maker_name,Md.id,Md.model_name,Md.type,Md.year from Models Md join Makers Mk on Md.maker_id = Mk.id'
  );

  return models;
};
