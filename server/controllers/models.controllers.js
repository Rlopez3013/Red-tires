import { pool } from '../db.js';
//import { getModelsAsync } from '..///Repository/RedTires.js';

export const getModels = async (req, res) => {
  try {
    const [result] = await //getModelsAsync();
    await pool.query(
      'select Mk.id as "makerId",Mk.maker_name,Md.id,Md.model_name,Md.type,Md.year from Models Md join Makers Mk on Md.maker_id = Mk.id'
    ); //make a join for makers value
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getModel = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`select * from Models where id = ${id}`, [
      // req.params.id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

export const createModel = async (req, res) => {
  try {
    const { model_name, trim, year, Makers_id } = req.body;

    const [result] = await pool.query(
      'insert into Models(model_name,trim,year,Makers_id) values (?,?,?,?)',
      [model_name, trim, year, Makers_id]
    );
    console.log(result);
    res.send('New Model created');
  } catch (error) {
    return res.status(500).json({ messsage: 'error.message' });
    console.log(error);
  }
};

export const updateModel = async (req, res) => {
  try {
    //const { id } = req.params;
    //const { model, type, year, Makers_id } = req.body;
    const [result] = await pool.query(`update Models set ? where id = ?`, [
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
    const [result] = await pool.query(`Delete from Models where id = ${id}`);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Model deleted', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};
export const getModelsByYear = async (req, res) => {
  try {
    console.log('by year');
    const { year } = req.params;
    const [result] = await pool.query(`SELECT 
    Ma.id as MakerId,
    Ma.maker_name, 
    Mo.id as ModelId,
    Mo.model_name,
    Mo.type
    FROM redtires.Models Mo
    inner join Makers Ma on Ma.id = Mo.Makers_id
    WHERE year = ${year}`);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Model year', success: true });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};
