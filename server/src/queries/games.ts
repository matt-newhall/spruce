export const createGamesTable = `
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  player_x_id INT REFERENCES players(id),
  player_o_id INT REFERENCES players(id),
  winner_id INT REFERENCES players(id),
  created_at TIMESTAMP DEFAULT NOW()
);
`;

export const createGame = `
  INSERT INTO games (player_x_id, player_o_id, winner_id)
  VALUES ($1, $2, $3);
`;

export const getStats = `
  SELECT
    COUNT(*)::int AS total_games,
    COUNT(CASE WHEN winner_id = 1 THEN 1 END)::int AS player_x_wins,
    COUNT(CASE WHEN winner_id = 2 THEN 1 END)::int AS player_o_wins,
    COUNT(CASE WHEN winner_id IS NULL THEN 1 END)::int AS draws
  FROM games;
`;
