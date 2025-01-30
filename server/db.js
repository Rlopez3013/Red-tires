import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'mysqldb',
  port: '3306',
  user: 'root',
  password: 'change-me',
  database: 'redtires3',
});
