import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'localhost',
  user: 'appuser',
  password: 'app_password_123',
  database: 'crosswinds',
  waitForConnections: true,
  connectionLimit: 10,
});
