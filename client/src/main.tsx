import React, { useState } from 'react'

import { Board, BoardResizer, StatsDisplay, VictoryBanner } from './components'
import { usePlayers, useStats, useGame } from './hooks'

export const Main = () => {
  const [boardSize, setBoardSize] = useState(3)

  const { players, loading: loadingPlayers } = usePlayers()
  const { stats, fetchStats } = useStats()
  const { gameState, onClickSquare, resetBoard, startGame } = useGame(boardSize, players, fetchStats)

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
