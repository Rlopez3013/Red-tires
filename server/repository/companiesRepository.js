import { pool } from '../db.js';

export const getCompanies = async (req, res) => {
  try {
    const [result] = await pool.query('Select * from companies');
    console.log(result);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const [result] = await pool.query('select * from companies where id = ?', [
      req.params.id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: 'company not found' });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  try {
    const { tire_company } = req.body;
    const [result] = await pool.query(
      'insert into companies(tire_company) values(?)',
      [tire_company]
    );
    console.log(result);
    res.send('New Company create');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const result = await pool.query('update companies set ? where id = ?', [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const [result] = await pool.query('delete from companies where id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Company not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
