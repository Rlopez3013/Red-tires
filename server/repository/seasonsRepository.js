import { pool } from '../db.js';

export const getSeasons = async (req, res) => {
  try {
    const [result] = await pool.query('Select * from Seasons');
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSeason = async (req, res) => {
  try {
    const [result] = await pool.query('select * from Seasons where id = ?', [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({
        message: 'Season not found',
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createSeason = async (req, res) => {
  try {
    const { sn_name } = req.body;
    const [result] = await pool.query(
      'insert into Seasons(sn_name) values(?)',
      [sn_name]
    );
    console.log(result);
    res.send('New Season Created');
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateSeason = async (req, res) => {
  try {
    const result = await pool.query('update Seasons set ? where id = ?', [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteSeason = async (req, res) => {
  try {
    const [result] = await pool.query('delete from Seasons where id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Season not found',
      });
    return res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
