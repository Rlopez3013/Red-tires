import { pool } from '../db.js';

export const getSizes = async (req, res) => {
  try {
    const [result] = await pool.query('select * from sizes');
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSize = async (req, res) => {
  try {
    const [result] = await pool.query('select * from sizes where id = ?', [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'Size not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSize = async (req, res) => {
  try {
    const { tire_size } = req.body;
    const [result] = await pool.query(
      'insert into sizes(tire_size) values(?)',
      [tire_size]
    );
    console.log(result);
    res.send('New size created');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSize = async (req, res) => {
  try {
    const result = await pool.query('update sizes set ? where id = ?', [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSize = async (req, res) => {
  try {
    const [result] = await pool.query('delete from sizes where id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Size not found',
      });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
