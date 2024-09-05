import { pool } from '../db.js';

export const getAllMakers = async (req, res) => {
  try {
    const [result] = await pool.query('Select * from makers');
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMaker = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`Select * from makers where id = ${id}`);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Maker not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error message' });
  }
};

export const createMaker = async (req, res) => {
  try {
    const { maker_name } = req.body;
    const [result] = await pool.query(
      'insert into makers(maker_name) values (?)',
      [maker_name]
    );
    console.log(result);
    res.send('New maker created!!');
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

export const deleteMaker = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`DELETE FROM makers WHERE id = ${id}`);
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: 'Maker deleted!!', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};

export const updateMaker = async (req, res) => {
  try {
    const { id } = req.params;
    const { maker_name } = req.body;
    const [result] = await pool.query(
      `update makers set maker_name = '${maker_name}' where id = ${id}`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Maker updated', success: true });
  }
  console.log(res);
};

// export const getAll = async () => await getMakers({}, result);
// console.log(result);
// export default getAll
