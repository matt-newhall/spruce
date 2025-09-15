import React from 'react'
import { Winner } from "../../types"

type Props = {
  winner: Winner;
  onReset: () => void;
}

export const VictoryBanner = ({ winner, onReset }: Props) => {
  const isDraw = winner === 'Draw'
  const heading = isDraw ? "It's a Draw!" : `Winner: ${winner}`

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
        <h2 className="text-3xl font-bold mb-4">
          {heading}
        </h2>
        {!isDraw && (
          <p className="text-lg mb-4">
            Congratulations {winner}!
          </p>
        )}
        <button
          onClick={onReset}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}