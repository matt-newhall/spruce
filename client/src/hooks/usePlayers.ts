import { useEffect, useState } from "react";

export function usePlayers() {
  const [players, setPlayers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/players")
      .then(res => res.json())
      .then(data => {
        setPlayers(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, []);

  return { players, loading };
}