import express from 'express';
import { db } from '../db.js';
import { authMiddleware } from '../auth.js';

const router = express.Router();

//router.post('/swipe-right/:userId', authMiddleware, async (req, res) => {
//  await db.execute(
//    `INSERT IGNORE INTO matches (swiper_id, matched_user_id)
//     VALUES (?, ?)`,
//    [req.user.id, req.params.userId]
//  );
//  res.sendStatus(200);
//});

router.get('/', authMiddleware, async (req, res) => {
  const [rows] = await db.execute(
    `SELECT u.*
     FROM matches m
     JOIN users u ON u.id = m.matched_user_id
     WHERE m.swiper_id = ?`,
    [req.user.id]
  );
  res.json(rows);
});

export default router;
