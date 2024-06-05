import { pool } from '../db.js';

export const getModelsTires = async (req, res) => {
  try {
    const [result] = await pool.query(`Select
    Md.id,
    Md.model_name,
    Md.year,
    Md.trim,
    Md.type,
    t.tire_name,
    Mk.maker_name,
    C.tire_company,
    Sn.sn_name,
    S.tire_size
    from Models_Tires l
    inner join Models Md on Md.id=l.model_id
    inner Join Tires t on t.id=l.tire_Id
    left join Companies C on C.id=t.company_id
    left join Makers Mk on Mk.id=Md.maker_id
    inner join Seasons Sn on Sn.id=t.sn_id
    inner join Sizes S on S.id=t.size_id`);
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getModelTire = async (req, res) => {
  try {
    const { model_name, tire, model_id } = req.params;

    console.log(req.params.model_name);
    const [result] = await pool.query(
      `Select
      t.id,
      Md.id,
      Md.model_name,
      Md.year,
      Md.type,
      Md.trim,
      t.tire_name,
      Mk.maker_name,
      C.tire_company,
      Sn.sn_name,
      S.tire_size
      from Models_Tires l
      inner join Models Md on Md.id=l.model_id
      inner Join Tires t on t.id=l.tire_Id
      left join Companies C on C.id=t.company_id
      left join Makers Mk on Mk.id=Md.maker_id
      inner join Seasons Sn on Sn.id=t.sn_id
      inner join Sizes S on S.id=t.size_id
      where model_id = '${model_id}'`
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
    const { model, model_id } = req.params;
    console.log(req.params.model_id);
    const [result] = await pool.query(
      `Select 
      M.id,
      M.model_name,
      M.year,
      t.tire_name,
      Mk.maker_name 
      from Models_Tires l 
      inner join Models M on M.id=l.model_id 
      inner Join Tires t on t.id = l.tire_Id
      left join Makers Mk on Mk.id=M.maker_id 
      where model_id = '${model_id}' `
    );
    if (result.length === 0) {
      return res.status(404).json({
        message: 'model not found 3!',
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getModelTirestires = async (req, res) => {
  try {
    const { tire_name, tire_Id } = req.params;
    console.log(req.params.tire_name);
    const [result] = await pool.query(
      `Select 
      t.id,
      t.tire_name,
      C.tire_company,
      Sn.sn_name,
      S.tire_size 
      from Models_Tires l 
      inner join Tires t on t.id = l.tire_Id 
      inner join Seasons Sn on Sn.id = t.sn_id 
      inner join Sizes S on S.id = t.size_id 
      left join Companies C on C.id = t.company_id
     where tire_Id = '${tire_Id}' `
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
    const { model_id } = req.body;
    const { tire_id } = req.body;
    const [result] = await pool.query(
      'insert into Models_Tires(model_id,tire_id) values (?,?)',
      [model_id, tire_id]
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
    const { model_id, tire_id } = req.body;

    const result = await pool.query(
      'update Models_Tires set  model_id = ? tire_id =? where modelId = ? tireId = ? ',
      [model_id, tire_id, modelId, tireId]
    );
    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteModelTires = async (req, res) => {
  try {
    const { model_id, tire_id } = req.body;
    const [result] = await pool.query(
      `delete from Models_Tires where  models_id = ? and tire_id = ?`,
      [model_id, tire_id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Model Tire not found' });

    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
