import { pool } from '../db.js';

export const getModels = async (req, res) => {
  try {
    const [result] = await pool.query(
      `select 
      Md.id,
      Mk.id as "makerId",
      Mk.maker_name,
      Md.id as "modelId",
      Md.model_name,
      Md.type,
      Md.trim,
      Md.year 
      from models Md join makers Mk on Md.maker_id = Mk.id`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  // return models;
};

export const getModel = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`select * from models where id = ${id}`, [
      // req.params.id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const createModel = async (req, res) => {
//   try {
//     const { model_name, trim, year, type, maker_id } = req.body;

//     const [result] = await pool.query(
//       'insert into models(model_name,trim,year,type,maker_id) values (?,?,?,?,?)',
//       [model_name, trim, year, type, maker_id]
//     );
//     console.log(result);
//     res.send('New Model created');
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ messsage: error.message });
//   }
// };

export const createModel = async (req, res) => {
  try {
    const { model_name, trim, year, type, maker_id } = req.body;
    const [result] = await pool.query(
      'insert into models(model_name, trim, year,type,maker_id) values (?,?,?,?,?)',
      [model_name, trim, year, type, maker_id]
    );
    const newModel = {
      id: result.insertId,
      model_name,
      trim,
      year,
      type,
      maker_id,
    };

    res.status(201).json(newModel);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });    
  }
};

export const updateModel = async (req, res) => {
  try {
    //const { id } = req.params;
    //const { model, type, year, Makers_id } = req.body;
    const [result] = await pool.query(`update models set ? where id = ?`, [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Model Updated !', success: true });
  }
  console.log(res);
};

export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`Delete from models where id = ${id}`);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Model deleted', success: true });
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, success: false });
  }
};
export const getModelsByYear = async (req, res) => {
  try {
    console.log('by year');
    const { year } = req.params;
    const [result] = await pool.query(`SELECT 
    Ma.id as "MakerId",
    Ma.maker_name, 
    Mo.id as "ModelId",
    Mo.model_name,
    Mo.trim,
    Mo.type,
    Mo.year
    FROM models Mo
    inner join makers Ma on Ma.id = Mo.maker_id
    WHERE year = ${year}`);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Model year', success: true });
    console.log(result);
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'error', success: false });
  }
};
