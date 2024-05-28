import { pool } from '../db.js';

export const getMakers = async (req, res) => {
  try {
    const [result] = await pool.query('Select * from Makers');
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMaker = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`Select * from Makers WHERE id = ${id}`, [
      // req.params.id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Maker not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

export const createMaker = async (req, res) => {
  try {
    const { maker } = req.body;
    const [result] = await pool.query('insert into Makers(name) values (?)', [
      maker,
    ]);
    console.log(result);
    res.send('New maker created');
  } catch (error) {
    return res.status(500).json({ message: 'error.message' });
  }
};

export const updateMaker = async (req, res) => {
  try {
    const { id } = req.params;
    const { maker } = req.body;
    const [result] = await pool.query(
      `update Makers set maker = '${maker}' where id = ${id}`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Maker updated', success: true });
  }
  console.log(res);
};

export const deleteMaker = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`DELETE FROM Makers WHERE id = ${id}`);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Maker deleted', success: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'error', success: false });
  }
};
