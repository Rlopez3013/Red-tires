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
    from models_tires l
    inner join models Md on Md.id=l.model_id
    inner Join tires t on t.id=l.tire_Id
    left join companies C on C.id=t.company_id
    left join makers Mk on Mk.id=Md.maker_id
    inner join seasons Sn on Sn.id=t.sn_id
    inner join sizes S on S.id=t.size_id`);
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
      from models_tires l
      inner join models Md on Md.id=l.model_id
      inner Join tires t on t.id=l.tire_Id
      left join companies C on C.id=t.company_id
      left join makers Mk on Mk.id=Md.maker_id
      inner join seasons Sn on Sn.id=t.sn_id
      inner join sizes S on S.id=t.size_id
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
      from models_tires l
      inner join models M on M.id=l.model_id
      inner Join tires t on t.id = l.tire_Id
      left join makers Mk on Mk.id=M.maker_id
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
      from models_tires l
      inner join tires t on t.id = l.tire_Id
      inner join seasons Sn on Sn.id = t.sn_id
      inner join sizes S on S.id = t.size_id
      left join companies C on C.id = t.company_id
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
    const { tire_Id } = req.body;
    const [result] = await pool.query(
      'insert into models_tires(model_id,tire_Id) values (?,?)',
      [model_id, tire_Id]
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
      'update models_tires set  model_id = ? tire_id =? where modelId = ? tireId = ? ',
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
    const { model_id, tire_Id } = req.body;
    const [result] = await pool.query(
      `delete from models_tires where  models_id = ? and tire_Id = ?`,
      [model_id, tire_Id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Model Tire not found' });

    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
