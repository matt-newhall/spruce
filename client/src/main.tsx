import React, { useState } from 'react'
import { XorO } from './types'


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])

  const [player, setPlayer] = useState<XorO>('X')

  const onClickCell = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex] !== undefined) {
      return
    }

    const updatedBoard = board.map((row, rowId) =>
      row.map((cell, colId) => {
        if (rowId === rowIndex && colId === colIndex) {
          return player
        }
        return cell
      })
    )

    setBoard(updatedBoard)
    setPlayer(player === 'X' ? 'O' : 'X')
  }

  return (
    <div className='flex flex-col mt-10 items-center gap-10'>
      <div className='font-bold text-2xl'>Tic Tac Toe</div>
      <div className='flex flex-col gap-1'>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className='flex gap-1'>
            {row.map((col, colIndex) => (
              <div
                key={colIndex}
                className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex hover:bg-gray-100'
                onClick={() => onClickCell(rowIndex, colIndex)}
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
