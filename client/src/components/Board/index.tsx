import React from 'react'
import { Tile } from "../../types"

type Props = {
  board: Tile[][];
  onClickCell: (rowIndex: number, colIndex: number) => void;
}

const Board = (props: Props) => {
  const { board, onClickCell } = props

  return (
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
  )
}

export default Board
