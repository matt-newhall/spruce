import { Router } from "express";

import { createGame, getStats } from "../queries/games";
import { pool } from "../db";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { playerXId, playerOId, winnerId } = req.body;
    await pool.query(createGame, [playerXId, playerOId, winnerId || null]);
    res.status(201).json({ message: "Game created successfully" });
  } catch (err) {
    next(err);
  }
});

router.get("/stats", async (_, res, next) => {
  try {
    const result = await pool.query(getStats);

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;
