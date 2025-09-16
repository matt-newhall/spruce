import React, { useEffect, useState } from 'react'
import { GameState, Stats } from './types'
import Board from './components/Board'
import { isBoardFull, isWinningMove } from './utils/boardUtils'
import { VictoryBanner } from './components/VictoryBanner'
import { BoardResizer } from './components/BoardResizer'
import { getPlayerId } from './utils/serverUtils'
import { StatsDisplay } from './components/StatsDisplay'

export const Main = () => {
  const [players, setPlayers] = useState<{ id: number; name: string }[]>([])
  const [loadingPlayers, setLoadingPlayers] = useState(true)

  const [stats, setStats] = useState<Stats | null>(null)

  const [boardSize, setBoardSize] = useState(3)
  const [gameState, setGameState] = useState<GameState | null>(null)

  const startGame = () => {
    const inner = Array(boardSize).fill(undefined)
    const board = Array(boardSize).fill(inner)
    setGameState({
      board,
      player: 'X'
    })
  }

  const resetBoard = () => {
    setGameState(null)
  }

  const fetchStats = () => {
    fetch("http://localhost:4000/games/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalGames: data.total_games,
          playerXWins: data.player_x_wins,
          playerOWins: data.player_o_wins,
          draws: data.draws,
        })
      })
      .catch(console.error);
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

  useEffect(() => {
    fetchStats()
    fetch("http://localhost:4000/players")
      .then(res => res.json())
      .then(data => {
        setPlayers(data)
        setLoadingPlayers(false)
      })
      .catch(err => {
        console.error(err)
        setLoadingPlayers(false)
      })
  }, [])

  if (loadingPlayers) return <div>Loading players...</div>

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>
      {gameState ? (
        <>
          <Board board={gameState.board} onClickSquare={onClickSquare} />
          {gameState.winner && <VictoryBanner winner={gameState.winner} onReset={resetBoard} />}
        </>
      ) : (
        <BoardResizer startGame={startGame} boardSize={boardSize} setBoardSize={setBoardSize} />
      )}
      <StatsDisplay stats={stats} />
    </div>
  )
}
