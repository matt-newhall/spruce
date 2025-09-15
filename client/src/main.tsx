import React, { useState } from 'react'
import { XorO } from './types'
import Board from './components/Board'


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  const [player, setPlayer] = useState<XorO>('X')

  const onClickSquare = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== undefined) {
      return
    }

    // avoids iterating over the whole array - so clone the row array
    const updatedBoard = [...board]
    updatedBoard[rowIndex] = [...updatedBoard[rowIndex]]
    // and add the player's symbol
    updatedBoard[rowIndex][colIndex] = player

    setBoard(updatedBoard)
    setPlayer(player === 'X' ? 'O' : 'X')
  }

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>
      <Board board={board} onClickSquare={onClickSquare} />
    </div>
  )
}
