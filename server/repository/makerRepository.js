import { pool } from '../../db.js';
const [result] = await pool.query('Select * from Makers');

export const getAll = async () => await getMakers({}, result);
console.log(result);
export default getAll;
