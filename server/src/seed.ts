import { pool } from "./db";
import { insertPlayer } from "./queries/players";

/**
 * Seeds the database with two default players
 *
 * If players already exist in the database, skip seeding. This
 * allows users to change their name if they wish without creating
 * new users in the database if the server is restarted.
 */
export async function seedPlayers() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM players");
  if (parseInt(rows[0].count) > 0) {
    console.log("Players already exist, skipping seeding");
    return;
  }

  try {
    await pool.query(insertPlayer("Player X"));
    await pool.query(insertPlayer("Player O"));


    console.log("Players seeded successfully!");
  } catch (err) {
    console.error("Error seeding players:", err);
    throw err;
  }
}