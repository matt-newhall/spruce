import React, { useEffect, useState } from "react";
import { Stats } from "../../types";

type Props = {
  stats: Stats | null
}

export const StatsDisplay = ({ stats }: Props) => {
  if (!stats) return <div className="text-sm text-gray-500">Loading stats...</div>;

  return (
    <div className="mt-8 p-4 border-t border-gray-300 text-center text-sm">
      <div>Total games: {stats.totalGames}</div>
      <div>Player X wins: {stats.playerXWins}</div>
      <div>Player O wins: {stats.playerOWins}</div>
      <div>Draws: {stats.draws}</div>
    </div>
  );
};