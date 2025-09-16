import { Router } from "express";

import { getAllPlayers } from "../services/players";

const router = Router();

router.get("/", async (_, res, next) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (err) {
    next(err);
  }
});

export default router;
