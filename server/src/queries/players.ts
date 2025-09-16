export const createPlayersTable = `
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
`;

export const insertPlayer = (name: string) => `
INSERT INTO players (name)
VALUES ('${name}')
ON CONFLICT (name) DO NOTHING;
`;
