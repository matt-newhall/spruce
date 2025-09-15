import React, { useState } from 'react'
import { Winner, XorO } from './types'
import Board from './components/Board'
import { isBoardFull, isWinningMove } from './utils/boardUtils'


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>(Array(3).fill(Array(3).fill(undefined)))
  const [player, setPlayer] = useState<XorO>('X')

  const resetBoard = () => {
    setBoard(Array(3).fill(Array(3).fill(undefined)))
    setPlayer('X')
  }

  const displayWinnerAndEnd = (winner: Winner) => {
    alert(`The winner is.. ${winner}!\n\nPress OK to restart.`);
    resetBoard()
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
      displayWinnerAndEnd(player)
    } else if (allTilesFilled) {
      displayWinnerAndEnd('Draw')
    } else {
      // no endgame condition met, switch player and continue
      setPlayer(player === 'X' ? 'O' : 'X')
    }
  }

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>
      <Board board={board} onClickSquare={onClickSquare} />
    </div>
  )
}
