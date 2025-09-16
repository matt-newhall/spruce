export const createGamesTable = `
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  player_x_id INT REFERENCES players(id),
  player_o_id INT REFERENCES players(id),
  winner_id INT REFERENCES players(id),
  created_at TIMESTAMP DEFAULT NOW()
);
`;
