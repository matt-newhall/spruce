const express = require('express');
const cors = require('cors');

import config from '../config/config';
import { initDb } from './db';
import errorHandler from './middleware/errorHandler';
import gamesRouter from './routes/games';
import playersRouter from './routes/players';
import { seedPlayers } from './services/players';


const app = express();

app.use(cors());
app.use(express.json());

app.use("/players", playersRouter);
app.use("/games", gamesRouter);
app.use(errorHandler);


const startServer = async () => {
  try {
    await initDb();
    await seedPlayers();

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log("Players seeded on startup");
    });
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

startServer();

export default app;