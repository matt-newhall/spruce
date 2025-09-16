import { useState } from "react"

import { GameState } from "../types"
import { isBoardFull, isWinningMove } from "../utils/boardUtils"
import { getPlayerId } from "../utils/serverUtils"

export const useGame = (boardSize: number, players: {id: number; name: string}[], fetchStats: () => void) => {
  const [gameState, setGameState] = useState<GameState | null>(null)

  const resetBoard = () => setGameState(null)

  const startGame = () => {
    const inner = Array(boardSize).fill(undefined)
    const board = Array(boardSize).fill(inner)
    setGameState({
      board,
      player: 'X'
    })
  }

  const onClickSquare = (rowIndex: number, colIndex: number) => {
    if (!gameState) return

    if (gameState.board[rowIndex][colIndex] !== undefined) {
      return
    }

    // avoids iterating over the whole array - so clone the row array
    const updatedBoard = [...gameState.board]
    updatedBoard[rowIndex] = [...updatedBoard[rowIndex]]
    // and add the player's symbol
    updatedBoard[rowIndex][colIndex] = gameState.player

    const isWin = isWinningMove(updatedBoard, rowIndex, colIndex, gameState.player)
    const allTilesFilled = isBoardFull(updatedBoard)

    const winner = isWin ? gameState.player : allTilesFilled ? 'Draw' : undefined
    const winnerId = isWin
      ? getPlayerId(players, gameState.player)
      : undefined

    setGameState({
      board: updatedBoard,
      player: gameState.player === 'X' ? 'O' : 'X',
      winner: winner
    })

    if (winnerId !== undefined || allTilesFilled) {
      const body = JSON.stringify({
        playerXId: getPlayerId(players, 'X'),
        playerOId: getPlayerId(players, 'O'),
        winnerId
      });

      fetch("http://localhost:4000/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      })
      .then(res => res.json())
      .then(data => console.log("Game saved:", data))
      .then(fetchStats)
      .catch(err => console.error("Error saving game:", err));
    }
  }

  return { gameState, onClickSquare, resetBoard, startGame }
}
