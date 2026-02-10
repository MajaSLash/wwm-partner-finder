import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, gender, role, level, region } = req.body;
  const hash = await bcrypt.hash(password, 10);

  await db.execute(
    `INSERT INTO users (username, password_hash, gender, role, level, region)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [username, hash, gender, role, level, region]
  );

  res.sendStatus(201);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [[user]] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  console.log({
    inputPassword: password,
    storedHash: user.password_hash,
    compare: await bcrypt.compare(password, user.password_hash),
  });
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.sendStatus(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res.json({ token, user: { id: user.id, username: user.username } });
});

export default router;
