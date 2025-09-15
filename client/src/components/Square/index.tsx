import React from 'react'
import { Tile } from "../../types";

type Props = {
  row: number;
  col: number;
  value: Tile;
  onClick: (rowIndex: number, colIndex: number) => void
}

const Square = (props: Props) => {
  const { value, row, col, onClick } = props

  return (
    <div
      key={`${row}${col}`}
      className='border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex hover:bg-gray-100'
      onClick={() => onClick(row, col)}
    >
      {value}
    </div>
  )
}

export default Square
