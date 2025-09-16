import request from "supertest";

import app from "../../app";
import { pool } from "../../db";
import { seedPlayers } from "../../services/players";

describe("Players API", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM games;");
    await pool.query("DELETE FROM players;");
    await seedPlayers()
  });

  afterAll(async () => {
    await pool.end();
  });

  it("should create and fetch 2 players", async () => {
    const res = await request(app).get("/players");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("name");
    expect(res.body[1]).toHaveProperty("id");
    expect(res.body[1]).toHaveProperty("name");
  });
});