import { useEffect, useState } from "react";

import { Stats } from "../types";

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null)

  const fetchStats = () => {
    fetch("http://localhost:4000/games/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          totalGames: data.total_games,
          playerXWins: data.player_x_wins,
          playerOWins: data.player_o_wins,
          draws: data.draws,
        })
      })
      .catch(console.error);
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, fetchStats }
}
