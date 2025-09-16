import { Pool } from "pg";

import config from "../config/config";
import { createGamesTable } from "./queries/games";
import { createPlayersTable } from "./queries/players";

export const pool = new Pool({
  host: config.databaseHost,
  database: config.databaseName,
  user: config.databaseUser,
  password: config.databasePassword,
  port: config.databasePort,
});

export async function initDb() {
  await pool.query(createPlayersTable);
  await pool.query(createGamesTable);
  console.log("Database initialised successfully.");
}
