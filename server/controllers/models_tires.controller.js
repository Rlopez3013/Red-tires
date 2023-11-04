import { pool } from '../db.js';

export const getModelsTires = async (req, res) => {
  try {
    const [result] = await pool.query(`select * from Modelos_Gomas`);
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getModelTire = async (req, res) => {
  try {
    const { model, tire } = req.params;

    console.log(req.params.model);
    const [result] = await pool.query(
      `Select
      Md.model,
      Md.type,
      Md.year,
      t.tire,
      Mk.maker,
      C.company,
      Sn.season,
      S.size
      from Models_Tires l
      inner join Models Md on Md.id=l.Models_id
      inner Join Tires t on t.id=l.Tires_id
      left join Companies C on C.id=t.Companies_id
      left join Makers Mk on Mk.id=Md.Makers_id
      inner join Seasons Sn on Sn.id=t.Seasons_id
      inner join Sizes S on S.id=t.Sizes_id
      where Md.model = '${model}'`
    );
    if (result.length === 0) {
      return res.status(404).json({ message: 'C404 Models_Tires not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getModelTiremodel = async (req, res) => {
  try {
    const { model } = req.params;
    console.log(req.params.model);
    const [result] = await pool.query(
      `Select Md.model,Md.type,Md.year,Mk.maker from Models_Tires l inner join Models Md on Md.id=l.Models_id left join Makers Mk on Mk.id=Md.Makers_id where Md.model = '${model}' `
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: 'model not found',
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getModelTirestires = async (req, res) => {
  try {
    const { tire } = req.params;
    console.log(req.params.tire);
    const [result] = await pool.query(
      `Select tr.tire,C.company,Sn.season,S.size from Models_Tires l 
      inner join Tires tr on tr.id=l.Tires_id inner join Seasons Sn on Sn.id=tr.Seasons_id inner join Sizes S on S.id=tr.Sizes_id 
      left join Companies C on C.id=tr.Companies_id
     where tr.tire = '${tire}' `
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: 'Tire not found',
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createModelTire = async (req, res) => {
  try {
    const { Models_id } = req.body;
    const { Tires_id } = req.body;
    const [result] = await pool.query(
      'insert into Models_Tires(Models_id,Tires_id) values (?,?)',
      [Models_id, Tires_id]
    );
    console.log(result);
    res.send('New Model Tire created');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateModelTire = async (req, res) => {
  try {
    const { modelId, tireId } = req.params;
    const { Models_id, Tires_id } = req.body;

    const result = await pool.query(
      'update Models_Tires set  Models_id = ? Tires_id =? where modelId = ? tireId = ? ',
      [Models_id, Tires_id, modelId, tireId]
    );
    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteModelTires = async (req, res) => {
  try {
    const { Models_id, Tires_id } = req.body;
    const [result] = await pool.query(
      `delete from Models_Tires where  Models_id = ? and Tires_id = ?`,
      [Models_id, Tires_id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Model Tire not found' });

    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
