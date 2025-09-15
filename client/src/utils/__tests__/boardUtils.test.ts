import { Board } from "../../types"
import { isBoardFull, isWinningMove } from "../boardUtils"

describe('boardUtils', () => {
  describe('isWinningMove', () => {
    it('should detect a row win', () => {
      const board: Board = [
        ['X', 'X', 'X'],
        ['O', 'O', undefined],
        [undefined, undefined, undefined]
      ]

      expect(isWinningMove(board, 0, 2, 'X')).toBe(true)
    })

    it('should detect a column win', () => {
      const board: Board = [
        ['O', 'X', undefined],
        ['O', 'X', undefined],
        ['O', undefined, undefined]
      ]

      expect(isWinningMove(board, 2, 0, 'O')).toBe(true)
    })

    it('should detect a diagonal win', () => {
      const board: Board = [
        ['X', 'O', undefined],
        ['O', 'X', undefined],
        [undefined, undefined, 'X']
      ]

      expect(isWinningMove(board, 2, 2, 'X')).toBe(true)
    })

    it('should return false when no win condition is met', () => {
      const board: Board = [
        ['X', 'O', undefined],
        ['O', 'X', undefined],
        [undefined, undefined, undefined]
      ]

      expect(isWinningMove(board, 1, 0, 'O')).toBe(false)
    })
  })

  describe('isBoardFull', () => {
    it('should return true when board is completely filled', () => {
      const board: Board = [
        ['X', 'O', 'X'],
        ['O', 'X', 'O'],
        ['O', 'X', 'O']
      ]

      expect(isBoardFull(board)).toBe(true)
    })

    it('should return false when board has empty squares', () => {
      const board: Board = [
        ['X', 'O', 'X'],
        ['O', 'X', undefined],
        ['O', 'X', 'O']
      ]

      expect(isBoardFull(board)).toBe(false)
    })
  })
})