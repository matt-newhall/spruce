import { XorO } from "../types";

export const getPlayerId = (players, symbol: XorO) => {
  const name = symbol === 'X' ? 'Player X' : 'Player O';
  return players.find(p => p.name === name)?.id;
};
