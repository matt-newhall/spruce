import React from 'react'
import { BOARD_SIZE_MAX, BOARD_SIZE_MIN } from '../../constants';

type Props = {
  boardSize: number;
  setBoardSize: (value: number) => void;
  startGame: () => void;
}

export const BoardResizer = ({ boardSize, setBoardSize, startGame }: Props) => {
  return (
    <div className='flex flex-col items-center gap-4 p-6 border-2 rounded-lg bg-gray-50'>
      <div className='text-xl'>Choose Board Size</div>

      <div className='flex flex-col items-center gap-3'>
        <input
          type="range"
          min={BOARD_SIZE_MIN}
          max={BOARD_SIZE_MAX}
          value={boardSize}
          onChange={(e) => setBoardSize(Number(e.target.value))}
          className="w-64 h-3 bg-gray-200 rounded-lg cursor-pointer slider"
        />

        <div className='text-lg font-medium text-blue-600'>
          {boardSize} x {boardSize}
        </div>
      </div>

      <button
        onClick={startGame}
        className="mt-4 px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg cursor-pointer"
      >
        Start Game
      </button>
    </div>
  )
}