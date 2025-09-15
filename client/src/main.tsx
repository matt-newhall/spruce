import React, { useState } from 'react'
import { Winner, XorO } from './types'
import Board from './components/Board'
import { isBoardFull, isWinningMove } from './utils/boardUtils'
import { VictoryBanner } from './components/VictoryBanner'
import { BoardResizer } from './components/BoardResizer'


export const Main = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [boardSize, setBoardSize] = useState(3)
  const [board, setBoard] = useState<(XorO | undefined)[][]>([])
  const [player, setPlayer] = useState<XorO>('X')
  const [winner, setWinner] = useState<Winner>()

  const startGame = () => {
    setIsGameStarted(true)
    setBoard(Array(boardSize).fill(Array(boardSize).fill(undefined)))
    setPlayer('X')
  }

  const resetBoard = () => {
    setBoard([])
    setWinner(undefined)
    setIsGameStarted(false)
  }

  const onClickSquare = async (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== undefined) {
      return
    }

    // avoids iterating over the whole array - so clone the row array
    const updatedBoard = [...board]
    updatedBoard[rowIndex] = [...updatedBoard[rowIndex]]
    // and add the player's symbol
    updatedBoard[rowIndex][colIndex] = player

    await setBoard(updatedBoard)

    const isWin = isWinningMove(updatedBoard, rowIndex, colIndex, player)
    const allTilesFilled = isBoardFull(updatedBoard)

    if (isWin) {
      setWinner(player)
    } else if (allTilesFilled) {
      setWinner('Draw')
    } else {
      // no endgame condition met, switch player and continue
      setPlayer(player === 'X' ? 'O' : 'X')
    }
  }

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>
      {isGameStarted ? (
        <>
          <Board board={board} onClickSquare={onClickSquare} />
          {winner && <VictoryBanner winner={winner} onReset={resetBoard} />}
        </>
      ) : (
        <BoardResizer startGame={startGame} boardSize={boardSize} setBoardSize={setBoardSize} />
      )}
    </div>
  )
}
