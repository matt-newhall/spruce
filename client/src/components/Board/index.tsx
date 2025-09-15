import React from 'react'
import { Board } from "../../types"
import Square from '../Square';

type Props = {
  board: Board;
  onClickSquare: (rowIndex: number, colIndex: number) => void;
}

const Board = (props: Props) => {
  const { board, onClickSquare } = props

  return (
    <div className='flex flex-col gap-1'>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className='flex gap-1'>
          {row.map((col, colIndex) => (
            <Square row={rowIndex} col={colIndex} value={col} onClick={onClickSquare} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
