import request from "supertest";

import app from "../../app";
import { pool } from "../../db";
import { seedPlayers } from "../../services/players";

describe("Games API", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM games;");
    await pool.query("DELETE FROM players;");
    await seedPlayers()
  });

  afterAll(async () => {
    await pool.end();
  });

  it("should create a new game", async () => {
    const playersRes = await request(app).get("/players");
    const playerXId = playersRes.body[0].id;
    const playerOId = playersRes.body[1].id;

    const res = await request(app)
      .post("/games")
      .send({ playerXId, playerOId, winnerId: playerXId });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Game created successfully");
  });

  it("should retrieve game stats", async () => {
    const res = await request(app).get("/games/stats");
    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("player_x_wins");
    expect(res.body).toHaveProperty("player_o_wins");
    expect(res.body).toHaveProperty("total_games");
    expect(res.body).toHaveProperty("draws");
  });
});
