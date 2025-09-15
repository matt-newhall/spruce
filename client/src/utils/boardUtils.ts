import { Board, Tile, XorO } from "../types";

/**
 * Checks if the square in which a tile was just placed has resulted in a victory.
 *
 * @param board - The current board data.
 * @param row - The index of the row in which a tile was last placed.
 * @param row - The index of the col in which a tile was last placed.
 * @param player - The symbol of the player that placed the last tile.
 * @returns true if the last move was a winning move, otherwise false
 */
export const isWinningMove = (board: Board, row: number, col: number, player: XorO) => {
  const size = board.length

  // Check row win
  if (board[row].every(square => square === player)) return true

  // Check column win
  if (board.every(r => r[col] === player)) return true

  // Optionally check diagonal wins
  if (row === col) {
    if (board.every((r, i) => r[i] === player)) return true
  } else if (row === size - col - 1) {
    if (board.every((r, i) => r[size - i - 1] === player)) return true
  }

  return false
}

/**
 * Checks if the board has no remaining empty squares.
 *
 * @param board - The current board data.
 * @returns true if the board is completely filled, else false
 */
export const isBoardFull = (board: Board) => {
  return board.every(row => row.every(square => square !== undefined))
}
