import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: 'localhost',
  port: '3305',
  user: 'root',
  password: 'change-me',
  database: 'redtires'
});

