import { Router } from "express";

import { seedPlayers } from "../seed";

const router = Router();

router.post("/seed", async (req, res, next) => {
  try {
    await seedPlayers();
    res.json({ message: "Players seeded successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
